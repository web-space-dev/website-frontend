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
display: flex;
justify-content: space-between;
align-items: center;
position: absolute;
width: 55vw;
bottom: 0.5rem;
right: 0.5rem;
background-color: #ffffff4b;
backdrop-filter: blur(5px);
border-radius: inherit;
padding: 0.5rem 0.5rem;
`;

const H2 = styled.h2`
margin: 0;
font-size: 1rem;
font-weight: normal;
`

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
              <H2>{project.title}</H2>
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
