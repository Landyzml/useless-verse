import type { Project } from "@/lib/projects";
import { EmptyProjectState } from "./empty-project-state";
import { ProjectCard } from "./project-card";
export function ProjectGrid({ projects }: { projects: readonly Project[] }) {
 return projects.length ? <div className="project-grid">{projects.map(project => <ProjectCard key={project.id} project={project}/>)}</div> : <EmptyProjectState/>;
}
