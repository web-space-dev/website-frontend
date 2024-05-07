import { Projects } from "../../interfaces/project";
import { IconButton } from "../global/iconButton";
import styled from "@emotion/styled";
import { breakpoints, dimensions } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import useIsDesktop from "../../hooks/useIsDesktop";
import { Fragment } from "react";
import Image from "next/image";

interface IProjectsData {
  projects: Projects;
}

const StyledHeading = styled.h2`
  font-weight: 500;
  text-align: center;
  width: 100%;
  margin-bottom: 60px;
  margin-left: auto;
  margin-right: auto;
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
    margin-bottom: 45px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
    margin-bottom: 32px;
  }
`;

const StyledProjectCardsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media (max-width: ${breakpoints.md}px) {
    flex-direction: column;
  }
`;
const StyledProjectCard = styled.div`
  max-width: 680px;
  min-width: 200px;
  width: 100%;
  height: 264px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  & img {
    border-radius: 26px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  @media (max-width: ${breakpoints.md}px) {
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
`;
const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 8px 8px 8px 24px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  margin: 0px 27px 20px 20px;
`;
const StyledTitle = styled.h3`
  margin: 0px;
  font-weight: 400;
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
`;

const StyledTitleWrapperMobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 8px 8px 8px 24px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  margin-bottom: 10px;
  width: 100%;
`;
const H2 = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.25rem;
  font-weight: normal;

  @media (max-width: 700px) {
    font-size: 1rem;
  }
`;
const StyledProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 35rem;
  width: auto;
  // padding: 0 2rem 0 1rem;
  justify-content: center;
  align-items: center;
  // gap: 0.5rem;
`;
const StyledShowcaseCategory = styled.p`
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.25rem;

  @media (max-width: 700px) {
    font-size: 1rem;
  }
`;
const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export function MoreProjects({ projects }: IProjectsData) {
  const isDesktop = useIsDesktop();
  return (
    <>
      <StyledHeading>More projects</StyledHeading>
      {isDesktop ? (
        <StyledProjectCardsWrapper>
          {projects.nodes.map((project, index) => (
            <StyledProjectCard key={index}>
              {project?.featuredImage?.node.sourceUrl && (
                <Image
                  src={project.featuredImage.node.sourceUrl}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  priority={true}
                />
              )}
              <StyledTitleWrapper>
                <StyledTitle>
                  {project.title}
                  {project.projectCategories.nodes[0] &&
                    " - " + project.projectCategories.nodes[0].name}
                </StyledTitle>
                <IconButton />
              </StyledTitleWrapper>
            </StyledProjectCard>
          ))}
        </StyledProjectCardsWrapper>
      ) : (
        <StyledProjectCardsWrapper>
          {projects.nodes.map((project, index) => (
            <Fragment key={index}>
              <StyledProjectCard>
                {project?.featuredImage?.node.sourceUrl && (
                  <Image
                    src={project.featuredImage.node.sourceUrl}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    priority={true}
                  />
                )}
              </StyledProjectCard>
              <StyledTitleWrapperMobile>
                <StyledProjectInfo>
                  <H2>{project.title}</H2>
                  <StyledShowcaseCategory>
                    {project.projectCategories?.nodes[0]?.name}
                  </StyledShowcaseCategory>
                </StyledProjectInfo>
                <StyledLink href={`/projects/${project.slug}`}>
                  <IconButton />
                </StyledLink>
              </StyledTitleWrapperMobile>
            </Fragment>
          ))}
        </StyledProjectCardsWrapper>
      )}
    </>
  );
}
