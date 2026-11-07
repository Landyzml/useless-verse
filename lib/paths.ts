/** Next Link prefixes routes itself. Use this only for files in public/. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export function publicAsset(path:string):string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${basePath}${path}`;
}
