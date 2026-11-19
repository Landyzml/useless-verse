/** Both variants are required when registering a project. See docs/project-cover-guidelines.md. */
export interface ProjectCoverSet {
  dark: string;
  light: string;
}
/** Order in this array is display order. A draft is never shown on the homepage. */
export interface Project {
  id: string;
  slug: string;
  title: string;
  description?: string;
  covers: ProjectCoverSet;
  publishedAt?: string;
  featured?: boolean;
  tags?: readonly string[];
  status: "draft" | "published";
}
export const projects: readonly Project[] = [{
  id: "shakespeare-translator", slug: "shakespeare-translator", title: "Shakespearean Translator",
  description: "Turn ordinary English into the language of the Bard.",
  covers: {
    dark: "/covers/shakespeare-translator/dark.svg",
    light: "/covers/shakespeare-translator/light.svg",
  },
  publishedAt: "2026-11-07", status: "published",
}];
/** Tolerate incomplete development data without emitting a broken image URL. */
export function resolveProjectCovers(covers?: Partial<ProjectCoverSet>): ProjectCoverSet | null {
  const dark = covers?.dark || covers?.light;
  const light = covers?.light || dark;
  return dark && light ? { dark, light } : null;
}
export function getPublishedProjects(registry: readonly Project[] = projects): Project[] {
  return registry.filter((project) => project.status === "published");
}
