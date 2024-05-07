import { Projects } from "../../interfaces/project";
import useIsMobile from "../../hooks/useIsMobile";
import ShowcaseWrapperDesktop from "./showcase/showcase-wrapper-desktop";
import ShowcaseWrapperMobile from "./showcase/showcase-wrapper-mobile";

export interface IShowcase {
  title: string;
  projects: Projects;
}

export default function Showcase({ title, projects }: IShowcase) {
  const isMobile = useIsMobile();

  if (isMobile)
    return <ShowcaseWrapperMobile title={title} projects={projects} />;

  return <ShowcaseWrapperDesktop title={title} projects={projects} />;
}
