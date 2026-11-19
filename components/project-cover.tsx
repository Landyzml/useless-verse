import Image from "next/image";
import { publicAsset } from "@/lib/paths";
import { resolveProjectCovers, type ProjectCoverSet } from "@/lib/projects";

export function ProjectCover({ covers }: { covers: ProjectCoverSet }) {
 const pair = resolveProjectCovers(covers);
 return <div className="project-thumbnail project-cover" data-project-cover aria-hidden="true">
  {pair && <>
   <Image className="project-cover-dark" data-cover-theme="dark" src={publicAsset(pair.dark)} alt="" width={720} height={540} sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 959px) calc(50vw - 48px), 440px"/>
   <Image className="project-cover-light" data-cover-theme="light" src={publicAsset(pair.light)} alt="" width={720} height={540} sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 959px) calc(50vw - 48px), 440px"/>
  </>}
 </div>;
}
