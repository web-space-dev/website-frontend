import { GetStaticProps } from "next";
import { ISiteData } from "../../interfaces/site";
import Layout from "../../components/layout";
import { getProjectsData, getSiteData } from "../../lib/api";
import { IProjectsData } from "../../interfaces/project";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { IconButton } from "../../components/global/icon-button";
import React, { useEffect, useState } from "react";
import ArrowDown from "../../icons/arrow-down";

interface IIndex {
  siteData: ISiteData;
  pageData: IProjectsData;
  preview: boolean;
}

interface IStyledContainerProps {
  imageSrc: string;
}

const StyledContainer = styled.div<IStyledContainerProps & { isDesktop: boolean }>`
  display: flex;
  flex-direction: column;
  background-image: url(${(props) => props.imageSrc});
  background-size: ${(props) => (props.isDesktop ? "cover" : "cover")};
  background-repeat: no-repeat;
  background-position: center;
  height: 20rem;
  margin: 0.75rem 1.25rem;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;

  /* &::before {
    content: "";
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.imageSrc});
    background-size: ${(props) => (props.isDesktop ? "cover" : "cover")};
    background-repeat: no-repeat;
    filter: blur(8px);
    opacity: 0.6;
    z-index: -1;
  } */

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(202, 1, 1, 0);
    border-radius: inherit;
    transition: background-color 0.3s ease-in-out;
  }

  &:hover {
    &::after {
      background-color: rgba(0, 0, 0, 0.267);
    }
  }
`;

const StyledProjectInfo = styled.div<{ isDesktop: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isDesktop ? "2fr 4rem" : "2fr 3rem"};
  align-items: center;
  position: ${(props) => (props.isDesktop ? "absolute" : "unset")};
  width: ${(props) => (props.isDesktop ? "50vw" : "auto")};
  height: 86px;
  bottom: 0.75rem;
  right: 0.75rem;
  background-color: #ffffff4b;
  backdrop-filter: blur(5px);
  border-radius: 0.75rem;
  padding: 0.3rem 0.3rem;
  margin: ${(props) => (props.isDesktop ? "0" : "-0.10rem 1rem 1rem 1rem")};
  z-index: 99;
`;

const StyledProjectDetails = styled.div<{ isDesktop: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isDesktop ? "row" : "column!important")};
  max-width: 35rem;
  width: auto;
  padding: 0 2rem 0 1rem;
  flex-direction: row;
  justify-content: space-between;
  gap: ${(props) => (props.isDesktop ? "2rem" : "0")};
  align-items: ${(props) => (props.isDesktop ? "center" : "unset")};
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledHeader = styled.div<{ isDesktop: boolean }>`
  display: flex;
  max-width: ${(props) => (props.isDesktop ? "auto" : "80vw")};
  flex-direction: ${(props) => (props.isDesktop ? "row" : "column")};
  align-items: ${(props) => (props.isDesktop ? "center" : "flex-start")};
  margin: ${(props) =>
    props.isDesktop
      ? "1.5rem auto 0.75rem auto"
      : "2.5rem 1.25rem 0rem 1.25rem"};
  gap: ${(props) => (props.isDesktop ? "1rem" : "0")};
`;

const StyledArrow = styled(ArrowDown)`
  fill: #b30707;
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

const H1 = styled.h1``;

const StyledShowcaseCategory = styled.p`
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.25rem;

  @media (max-width: 700px) {
    font-size: 1rem;
  }
`;

export default function Index({ siteData, pageData, preview }: IIndex) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth > 700);
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout preview={preview} pageTitle={"Projects"} siteData={siteData}>
      <StyledHeader isDesktop={isDesktop}>
        <H1>
          Take a look at our Projects <StyledArrow />
        </H1>
      </StyledHeader>

      {pageData.projects.nodes.map((project, index) => {
        return (
          <React.Fragment key={`${project.title}`}>
            {isDesktop ? (
              <StyledContainer
                isDesktop={isDesktop}
                imageSrc={project.featuredImage.node.sourceUrl}
              >
                <StyledProjectInfo isDesktop={isDesktop}>
                  <StyledProjectDetails isDesktop={isDesktop}>
                    <H2>{project.title}</H2>
                    <StyledShowcaseCategory>
                      {project.projectCategories?.nodes[0]?.name}
                    </StyledShowcaseCategory>
                  </StyledProjectDetails>
                  <StyledLink href={`/projects/${project.slug}`}>
                    <IconButton />
                  </StyledLink>
                </StyledProjectInfo>
              </StyledContainer>
            ) : (
              <>
                <StyledContainer
                  isDesktop={isDesktop}
                  imageSrc={project.featuredImage.node.sourceUrl}
                ></StyledContainer>
                <StyledProjectInfo isDesktop={isDesktop}>
                  <StyledProjectDetails isDesktop={isDesktop}>
                    <H2>{project.title}</H2>
                    <StyledShowcaseCategory>
                      {project.projectCategories?.nodes[0]?.name}
                    </StyledShowcaseCategory>
                  </StyledProjectDetails>
                  <StyledLink href={`/projects/${project.slug}`}>
                    <IconButton />
                  </StyledLink>
                </StyledProjectInfo>
              </>
            )}
          </React.Fragment>
        );
      })}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const pageData = await getProjectsData(preview);
  const siteData = await getSiteData();

  return {
    props: { siteData, pageData, preview },
    revalidate: 10,
  };
};
