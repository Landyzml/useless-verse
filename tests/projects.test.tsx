import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync, statSync } from "node:fs";
import { getPublishedProjects, resolveProjectCovers, type Project } from "../lib/projects";
import { ProjectGrid } from "../components/project-grid";
import { ProjectCover } from "../components/project-cover";
const fixture: Project = { id: "fixture", slug: "fixture", title: "Temporary fixture", covers: { dark: "/covers/fixture/dark.svg", light: "/covers/fixture/light.svg" }, status: "published" };
test("the Shakespearean Translator remains published", () => { assert.ok(getPublishedProjects().some(project => project.slug === "shakespeare-translator")); });
test("drafts are excluded and publication order is preserved", () => {
 const second = { ...fixture, id: "second", slug: "second" };
 assert.deepEqual(getPublishedProjects([{ ...fixture, status: "draft" }, second, fixture]), [second, fixture]);
});
test("empty gallery has honest copy and no project links", () => {
 const html = renderToStaticMarkup(<ProjectGrid projects={[]}/>);
 assert.match(html, /Nothing here\. Yet\./); assert.doesNotMatch(html, /href=/);
});
test("published fixture replaces empty state and renders a navigable card", () => {
 const html = renderToStaticMarkup(<ProjectGrid projects={[{ ...fixture, description: "Only a test", publishedAt: "2026-11-07" }]}/>);
 assert.match(html, /href="\/fixture\/?"/); assert.match(html, /Only a test/); assert.match(html, /dateTime="2026-11-07"/i); assert.doesNotMatch(html, /Nothing here/);
});
test("optional card metadata can be omitted", () => {
 const html = renderToStaticMarkup(<ProjectGrid projects={[fixture]}/>);
 assert.match(html, /Temporary fixture/); assert.doesNotMatch(html, /<time/);
});
test("every published project supplies two distinct bundled covers", () => {
 for (const project of getPublishedProjects()) {
  assert.notEqual(project.covers.dark, project.covers.light);
  for (const path of Object.values(project.covers)) {
   assert.ok(path.startsWith(`/covers/${project.slug}/`));
   const asset = new URL(`../public${path}`, import.meta.url);
   assert.ok(statSync(asset).size > 0);
   if (path.endsWith(".svg")) assert.match(readFileSync(asset, "utf8"), /viewBox="0 0 720 540"/);
  }
 }
});
test("cards render both decorative variants without duplicating their accessible title", () => {
 const html = renderToStaticMarkup(<ProjectGrid projects={[fixture]}/>);
 assert.match(html, /data-cover-theme="dark"[^>]*src="\/covers\/fixture\/dark.svg"/);
 assert.match(html, /data-cover-theme="light"[^>]*src="\/covers\/fixture\/light.svg"/);
 assert.equal((html.match(/Temporary fixture/g) ?? []).length, 1);
 assert.equal((html.match(/alt=""/g) ?? []).length, 2);
});
test("an incomplete development cover pair uses the available variant in both themes", () => {
 for (const covers of [{dark:"/cover.svg"},{light:"/cover.svg"}]) {
  const pair = resolveProjectCovers(covers);
  assert.deepEqual(pair, {dark:"/cover.svg",light:"/cover.svg"});
  assert.equal((renderToStaticMarkup(<ProjectCover covers={pair!}/>).match(/src="\/cover.svg"/g) ?? []).length, 2);
 }
});
test("absent development artwork preserves the cover slot without a broken image", () => {
 assert.equal(resolveProjectCovers(), null);
 const html = renderToStaticMarkup(<ProjectCover covers={{dark:"",light:""}}/>);
 assert.match(html, /project-thumbnail/);
 assert.doesNotMatch(html, /<img/);
});
