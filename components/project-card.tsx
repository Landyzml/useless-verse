import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectCover } from "./project-cover";
export function ProjectCard({ project }: { project: Project }) {
 return <article className="project-card"><Link href={`/${project.slug}/`}><ProjectCover covers={project.covers}/><h3>{project.title}<span aria-hidden="true">↗</span></h3>{project.description && <p>{project.description}</p>}{project.publishedAt && <time dateTime={project.publishedAt}>{new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(project.publishedAt))}</time>}</Link></article>;
}
