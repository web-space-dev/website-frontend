import styled from "@emotion/styled";
import { Project } from "../../../interfaces/project";
import Link from "next/link";
import { colors, dimensions } from "../../../styles/variables";
import { getRemSize } from "../../../styles/globalCss";
import { IconButton } from "../../global/icon-button";
import { CustomImage } from "../../global/image";

const StyledShowcaseWrapper = styled.div`
  grid-column: 1 / span 12;
  position: absolute;
  top: 85px;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  & div {
    margin: 0 10px;
  }
`;

const StyledShowcaseDetails = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`;

const StyledAllProjects = styled.div`
  width: 50%;
  height: 100%;
  background-color: ${colors.blackLight};
  border: 2px solid ${colors.white};
  border-radius: 12px;
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${getRemSize(dimensions.headingSizes.h2)};
`;

const StyledShowcaseImage = styled.div`
  height: 100%;

  & img {
    object-fit: cover;
    height: 100%;
    border-radius: 12px;
  }
`;

const StyledShowcaseContent = styled(Link)`
  position: absolute;
  top: 50%;
  bottom: 50%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin: 0 15px;

  & h3,
  p {
    margin: 0 15px;
  }
`;

const StyledShowcaseTitle = styled.h3`
  font-size: ${getRemSize(dimensions.headingSizes.h2)};
  font-weight: 400;
`;

const StyledShowcaseCategory = styled.p`
  font-size: ${getRemSize(dimensions.headingSizes.h4)};
  font-weight: 400;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 15px;
  & h3 {
    margin: 0;
    transition: 0.3s ease;
  }

  &:hover {
    h3 {
      color: ${colors.accent};
    }
    button {
      background-color: ${colors.accent};
      border-color: ${colors.accent};
    }
    path {
      fill: ${colors.white};
    }
  }
`;

interface ShowcaseItemProps {
  project: Project;
}

export function ShowcaseItem({ project }) {
  return (
    <StyledShowcaseWrapper>
      <StyledShowcaseDetails>
        <StyledShowcaseImage>
          <CustomImage
            alt={project.featuredImage.node.altText}
            width={750}
            height={800}
            src={project.featuredImage.node.sourceUrl}
            blurDataURL={project.featuredImage.node.placeholderDataURI}
          />
        </StyledShowcaseImage>

        <StyledShowcaseContent href={`/projects/${project.slug}`}>
          <StyledShowcaseTitle>{project.title}</StyledShowcaseTitle>
          <StyledShowcaseCategory>
            {project.projectCategories?.nodes[0]?.name}
          </StyledShowcaseCategory>
        </StyledShowcaseContent>

        {/* <Link href={`/projects/${project.slug}`}>View project</Link> */}
      </StyledShowcaseDetails>

      <StyledAllProjects>
        <StyledLink href="/projects">
          <StyledShowcaseTitle>View all projects</StyledShowcaseTitle>
          <IconButton />
        </StyledLink>
      </StyledAllProjects>
    </StyledShowcaseWrapper>
  );
}
