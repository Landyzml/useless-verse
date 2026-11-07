/** Order in this array is display order. A draft is never shown on the homepage. */
export interface Project {
  id: string;
  slug: string;
  title: string;
  description?: string;
  thumbnail: string;
  publishedAt?: string;
  featured?: boolean;
  tags?: readonly string[];
  status: "draft" | "published";
}
export const projects: readonly Project[] = [];
export function getPublishedProjects(registry: readonly Project[] = projects): Project[] {
  return registry.filter((project) => project.status === "published");
}
