import Link from "next/link";

import styled from "@emotion/styled";
import { getRemSize } from "../../styles/globalCss";
import { dimensions } from "../../styles/variables";
import { GridContainer } from "../global/grid/GridContainer";
import Image from "next/image";
import { Project, Projects } from "../../interfaces/project";

const StyledWrapper = styled(GridContainer)`
  margin: 40px 0;
  position: relative;
`;

const StyledTitle = styled.h2`
  font-size: ${getRemSize(dimensions.headingSizes.large)};
  text-align: center;
  grid-column: 1 / span 12;
  line-height: 225px;
`;

const StyledShowcaseWrapper = styled.div`
  grid-column: 1 / span 12;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  & div {
    margin: 0 10px;
    border-radius: 12px;
  }
`;

const StyledShowcaseDetails = styled.div`
  position: relative;
  height: 100%;
`;

const StyledAllProjects = styled.div`
  width: 50%;
  height: 100%;
  background-color: #bc515114;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${getRemSize(dimensions.headingSizes.h2)};
`;

const StyledShowcaseImage = styled(Image)`
  object-fit: cover;
  height: 100%;
  border-radius: 12px;
`;

const StyledShowcaseContent = styled.div`
  position: absolute;
  top: 50%;
  bottom: 50%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin: 0 15px;
`;

const StyledShowcaseTitle = styled.h3`
  font-size: ${getRemSize(dimensions.headingSizes.h2)};
  font-weight: 400;
`;

interface IShowcase {
  title: string;
  projects: Projects;
}

export default function Showcase({ title, projects }: IShowcase) {
  return (
    <StyledWrapper>
      <StyledTitle>{title}</StyledTitle>
      {projects.nodes.map((project: Project, index: number) => {
        if (index !== 1) return null;
        return (
          <StyledShowcaseWrapper key={index}>
            <StyledShowcaseDetails>
              <StyledShowcaseImage
                alt={project.featuredImage.node.altText}
                width={750}
                height={800}
                src={project.featuredImage.node.sourceUrl}
              />
              <StyledShowcaseContent>
                <StyledShowcaseTitle>{project.title}</StyledShowcaseTitle>
                <p>{project.projectCategories?.nodes[0]?.name}</p>
              </StyledShowcaseContent>

              {/* <Link href={`/projects/${project.slug}`}>View project</Link> */}
            </StyledShowcaseDetails>

            <StyledAllProjects>
              <Link href="/projects">View all projects</Link>
              {/* <StyledIconButton /> */}
            </StyledAllProjects>
          </StyledShowcaseWrapper>
        );
      })}
    </StyledWrapper>
  );
}
