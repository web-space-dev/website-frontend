import Image from "next/image";
import { IProjectData, Project } from "../../interfaces/project";

interface Props {
  project: Project;
}

export function Hero({ project }: Props) {
  return (
    <>
      <h1>{project.title}</h1>
      <p>
        {project.tags.nodes.map((tag, index) => (
          <span key={index}>{tag.name}</span>
        ))}
      </p>
      <p>
        {project.projectCategories.nodes.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </p>
      <Image
        width={1000}
        height={500}
        alt={`Cover Image for ${project.title}`}
        loader={() => project.featuredImage.node.sourceUrl}
        src={project.featuredImage.node.sourceUrl}
      />
      <p>
        {project.projectFields.stat1.field}: {project.projectFields.stat1.value}
      </p>
      <p>
        {project.projectFields.stat2.field}: {project.projectFields.stat2.value}
      </p>
      <p>
        {project.projectFields.stat3.field}: {project.projectFields.stat3.value}
      </p>
    </>
  );
}
