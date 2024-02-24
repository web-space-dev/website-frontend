import { GetStaticProps } from "next";
import { ISiteData } from "../../interfaces/site";
import Layout from "../../components/layout";
import { getProjectsData, getSiteData } from "../../lib/api";
import { IProjectsData } from "../../interfaces/project";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { IconButton } from "../../components/global/icon-button";
import { useEffect, useState } from "react";

interface IIndex {
  siteData: ISiteData;
  pageData: IProjectsData;
  preview: boolean;
}

interface IStyledContainerProps {
  imageSrc: string;
}

const StyledContainer = styled.div<IStyledContainerProps>`
  display: flex;
  flex-direction: column;
  background-image: url(${(props) => props.imageSrc});
  background-size: cover;
  height: 12rem;
  margin: 0.5rem 1rem;
  border-radius: 0.5rem;
  position: relative;

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
  display: ${(props) => (props.isDesktop ? "grid" : "flex")};
  grid-template-columns: 1fr 3rem;
  align-items: center;
  position: ${(props) => (props.isDesktop ? "absolute" : "null")};
  width: ${(props) => (props.isDesktop ? "55vw" : "auto")};
  bottom: 0.5rem;
  right: 0.5rem;
  background-color: #ffffff4b;
  backdrop-filter: blur(5px);
  border-radius: 0.5rem;
  padding: 0.25rem 0.25rem;
  margin: ${(props) => (props.isDesktop ? "0" : "0 1rem")};
  z-index: 999;
`;

const StyledProjectDetails = styled.div`
  display: flex;
  max-width: 35rem;
  width: auto;
  padding: 0 1rem;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: flex-end;
`;

const H2 = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: normal;
`;

const StyledShowcaseCategory = styled.p`
  margin: 0;
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
      <h1>Take a look at our Projects</h1>

      {pageData.projects.nodes.map((project, index) => {
        return (
          <>
            {isDesktop ? (
              <StyledContainer
                imageSrc={project.featuredImage.node.sourceUrl}
                key={index}
              >
                <StyledProjectInfo isDesktop={isDesktop}>
                  <StyledProjectDetails>
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
                  imageSrc={project.featuredImage.node.sourceUrl}
                  key={index}
                ></StyledContainer>
                <StyledProjectInfo isDesktop={isDesktop}>
                  <StyledProjectDetails>
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
          </>
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
