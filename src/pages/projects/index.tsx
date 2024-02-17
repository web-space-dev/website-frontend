import { GetStaticProps } from "next";
import { ISiteData } from "../../interfaces/site";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { getProjectsData, getSiteData } from "../../lib/api";
import { IProjectsData } from "../../interfaces/project";
import Image from "next/image";
import Link from "next/link";

interface IIndex {
  siteData: ISiteData;
  pageData: IProjectsData;
  preview: boolean;
}

export default function Index({ siteData, pageData, preview }: IIndex) {
  return (
    <Layout preview={preview} pageTitle={"Projects"} siteData={siteData}>
      <Navbar />
      <h1>Take a look at our Projects</h1>

      {pageData.projects.nodes.map((project, index) => {
        return (
          <div key={index}>
            <Image
              alt={project.featuredImage.node.altText}
              width={200}
              height={200}
              loader={() => project.featuredImage.node.sourceUrl}
              src={project.featuredImage.node.sourceUrl}
            />
            <h2>{project.title}</h2>
            <Link href={`/projects/${project.slug}`}>Read more</Link>
          </div>
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
