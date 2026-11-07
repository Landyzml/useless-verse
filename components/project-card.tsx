import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
export function ProjectCard({ project }: { project: Project }) {
 return <article className="project-card"><Link href={`/${project.slug}/`}><div className="project-thumbnail"><Image src={project.thumbnail} alt="" width={720} height={540} sizes="(max-width: 599px) 100vw, (max-width: 959px) 50vw, 33vw"/></div><h3>{project.title}<span aria-hidden="true">↗</span></h3>{project.description && <p>{project.description}</p>}{project.publishedAt && <time dateTime={project.publishedAt}>{new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(project.publishedAt))}</time>}</Link></article>;
}
