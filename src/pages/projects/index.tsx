import { GetStaticProps } from "next";
import { ISiteData } from "../../interfaces/site";
import Layout from "../../components/layout";
import { getProjectsData, getSiteData } from "../../lib/api";
import { IProjectsData } from "../../interfaces/project";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";


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
  background-image: url(${props => props.imageSrc});
  background-size: cover;
  height: 12rem;
  margin: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  position: relative;
`;

const StyledProjectInfo = styled.div`
position: absolute;
background-color: #46744d80;
`;

export default function Index({ siteData, pageData, preview }: IIndex) {
  return (
    <Layout preview={preview} pageTitle={"Projects"} siteData={siteData}>
      <h1>Take a look at our Projects</h1>

      {pageData.projects.nodes.map((project, index) => {
        return (
          <StyledContainer imageSrc={project.featuredImage.node.sourceUrl} key={index}>
            {/* <Image
              alt={project.featuredImage.node.altText}
              width={200}
              height={200}
              loader={() => project.featuredImage.node.sourceUrl}
              src={project.featuredImage.node.sourceUrl}
            /> */}
            <StyledProjectInfo>
              <h2>{project.title}</h2>
              <Link href={`/projects/${project.slug}`}>Read more</Link>
            </StyledProjectInfo>
          </StyledContainer>
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
