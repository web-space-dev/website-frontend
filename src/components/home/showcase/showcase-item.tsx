import styled from "@emotion/styled";
import { Project } from "../../../interfaces/project";
import Link from "next/link";
import { colors, dimensions } from "../../../styles/variables";
import { getRemSize } from "../../../styles/globalCss";
import { IconButton } from "../../global/iconButton";
import { CustomImage } from "../../global/image";
import { MotionValue, motion, useScroll } from "framer-motion";
import { useRef } from "react";

interface IStyledShowcaseWrapper {
  isOpen: boolean;
  showAllProjects: boolean;
  canSnapScroll: boolean;
}
const StyledShowcaseWrapper = styled(motion.div)<IStyledShowcaseWrapper>`
  grid-column: 1 / span 12;
  height: 100vh;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  position: relative;
  /* scroll-snap-align: center; */
  perspective: 500px;

  ${({ isOpen }) =>
    isOpen ? `scroll-snap-align: start;` : `scroll-snap-align: none;`}

  ${({ showAllProjects }) =>
    showAllProjects &&
    `
    // width: 50%;
  `}

  & div {
    height: 900px;
    margin: 40px 10px;
  }
`;

const StyledShowcaseDetails = styled(motion.div)`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`;

interface IStyledAllProjectsProps {
  showAllProjects: boolean;
}

const StyledAllProjects = styled(motion.div)<IStyledAllProjectsProps>`
  opacity: 0;
  width: 0%;
  /* height: 100%; */
  background-color: ${colors.blackLight};
  border: 2px solid ${colors.white};
  border-radius: 12px;
  backdrop-filter: blur(10px);
  justify-content: center;
  align-items: center;
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  transition: 0.3s ease;
  /* display: none; */

  ${({ showAllProjects }) => showAllProjects && `width: 50%;opacity: 1; `}
`;

const StyledShowcaseImage = styled(motion.div)`
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
  width: 95%;
  align-items: center;
  margin: 0 15px;

  & h3,
  p {
    margin: 0 15px;
  }
`;

const StyledShowcaseTitle = styled(motion.h3)`
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  font-weight: 400;
`;

const StyledShowcaseCategory = styled(motion.p)`
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
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
  scale?: MotionValue;
  isOpen: boolean;
  canSnapScroll?: boolean;
  showAllProjects?: boolean;
}

export function ShowcaseItem({
  project,
  scale,
  isOpen,
  canSnapScroll,
  showAllProjects,
}: ShowcaseItemProps) {
  // const ref = useRef(null);
  // const { scrollYProgress } = useScroll({ target: ref });

  return (
    <StyledShowcaseWrapper
      layout
      transition={{ duration: 1 }}
      isOpen={isOpen}
      canSnapScroll={canSnapScroll}
      showAllProjects={showAllProjects}
      style={scale ? { scale } : {}}
    >
      <StyledShowcaseDetails>
        <StyledShowcaseImage>
          <CustomImage
            alt={project.featuredImage.node.altText}
            width={1448}
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

      <StyledAllProjects showAllProjects={showAllProjects}>
        <StyledLink href="/projects">
          <StyledShowcaseTitle>View all projects</StyledShowcaseTitle>
          <IconButton />
        </StyledLink>
      </StyledAllProjects>
    </StyledShowcaseWrapper>
  );
}
