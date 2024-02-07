import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/global/container";
import ProjectBody from "../../components/project-body";
import MoreStories from "../../components/more-stories";
import Header from "../../components/global/header";
import ProjectHeader from "../../components/project-header";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import ProjectTitle from "../../components/project-title";
import Tags from "../../components/tags";
import {
  getAllProjectsWithSlug,
  getProjectAndMoreProjects,
  getSiteData,
} from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";
import Image from "next/image";
import { ISiteData } from "../../interfaces/site";
import { IProjectData } from "../../interfaces/project";
import CoverImage from "../../components/project/cover-image";
import Hero from "../../components/home/Hero";

interface IProject extends IProjectData {
  siteData: ISiteData;
  preview: boolean;
}

export default function Project({
  siteData,
  project,
  projects,
  preview,
}: IProject) {
  const router = useRouter();

  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview} pageTitle={project.title} siteData={siteData}>
      <Container>
        <Header />
        {router.isFallback ? (
          <h2>Loading</h2>
        ) : (
          <>
            <Hero project={project} />

            <h2>{project.title}</h2>

            {/* Other Projects */}
            <h2>Other projects</h2>
            {projects.nodes.map((project, index) => (
              <div key={index}>
                <Image
                  width={500}
                  height={200}
                  alt={`Cover Image for ${project.title}`}
                  loader={() => project.featuredImage?.node.sourceUrl}
                  src={project?.featuredImage?.node.sourceUrl}
                />
                <h3>{project.title}</h3>
              </div>
            ))}
          </>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const { project, projects } = await getProjectAndMoreProjects(params?.slug);
  const siteData = await getSiteData();

  return {
    props: {
      siteData,
      project,
      projects,
      preview,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allProjects = await getAllProjectsWithSlug();

  return {
    paths: allProjects.edges.map(({ node }) => `/projects/${node.slug}`) || [],
    fallback: true,
  };
};
