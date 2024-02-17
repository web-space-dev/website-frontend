import Link from "next/link";
import { Projects } from "../../interfaces/home";

interface IShowcase {
  title: string;
  projects: Projects;
}

export default function Showcase({ title, projects }: IShowcase) {
  return (
    <>
      <h2>{title}</h2>
      {projects.nodes.map((project, index) => {
        return (
          <div key={index}>
            <h3>{project.title}</h3>
            <p>{project.slug}</p>
            <img
              width={300}
              src={project.featuredImage.node.sourceUrl}
              alt={project.featuredImage.node.altText}
            />
            <Link href={`/projects/${project.slug}`}>View project</Link>
          </div>
        );
      })}
    </>
  );
}
