import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { getPublishedProjects, projects, type Project } from "../lib/projects";
import { ProjectGrid } from "../components/project-grid";
const fixture: Project = { id: "fixture", slug: "fixture", title: "Temporary fixture", thumbnail: "/thumbnails/fixture.svg", status: "published" };
test("production registry is empty", () => assert.equal(projects.length, 0));
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
