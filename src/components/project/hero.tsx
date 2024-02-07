import Image from "next/image";
import { IProjectData, Project } from "../../interfaces/project";

interface Props {
  project: Project;
}

export function Hero({ project }: Props) {
  return (
    <>
      <h1>{project.title}</h1>
      <Image
        width={2000}
        height={1000}
        alt={`Cover Image for ${project.title}`}
        loader={() => project.featuredImage.node.sourceUrl}
        src={project.featuredImage.node.sourceUrl}
      />
    </>
  );
}
