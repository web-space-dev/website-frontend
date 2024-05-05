import { Projects } from "../../interfaces/project";
import { IconButton } from "../global/iconButton";
import styled from "@emotion/styled";
import { breakpoints, dimensions } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import useIsDesktop from "../../hooks/useIsDesktop";
import { Fragment } from "react";

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
const StyledProjectCard = styled.div<{ bgImage: string }>`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  border-radius: 26px;
  max-width: 680px;
  min-width: 200px;
  width: 100%;
  height: 264px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

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

export function MoreProjects({ projects }: IProjectsData) {
  const isDesktop = useIsDesktop();
  return (
    <>
      <StyledHeading>More projects</StyledHeading>
      {isDesktop ? (
        <StyledProjectCardsWrapper>
          {projects.nodes.map((project, index) => (
            <StyledProjectCard
              key={index}
              bgImage={project?.featuredImage?.node.sourceUrl}
            >
              <img
                src={project?.featuredImage?.node.sourceUrl}
                alt={`Cover Image for ${project.title}`}
                width={714}
                height={264}
                style={{ display: "none" }}
              />
              <StyledTitleWrapper>
                <StyledTitle>{project.title}</StyledTitle>
                <IconButton />
              </StyledTitleWrapper>
            </StyledProjectCard>
          ))}
        </StyledProjectCardsWrapper>
      ) : (
        <StyledProjectCardsWrapper>
          {projects.nodes.map((project, index) => (
            <Fragment key={index}>
              <StyledProjectCard
                bgImage={project?.featuredImage?.node.sourceUrl}
              >
                <img
                  src={project?.featuredImage?.node.sourceUrl}
                  alt={`Cover Image for ${project.title}`}
                  width={714}
                  height={264}
                  style={{ display: "none" }}
                />
              </StyledProjectCard>
              <StyledTitleWrapperMobile>
                <StyledTitle>{project.title}</StyledTitle>
                <IconButton />
              </StyledTitleWrapperMobile>
            </Fragment>
          ))}
        </StyledProjectCardsWrapper>
      )}
    </>
  );
}
