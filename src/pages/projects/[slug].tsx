import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { GetStaticPaths, GetStaticProps } from "next";
import Header from "../../components/global/header";
import Layout from "../../components/layout";
import {
  getAllProjectsWithSlug,
  getProjectAndMoreProjects,
  getSiteData,
} from "../../lib/api";
import Image from "next/image";
import { ISiteData } from "../../interfaces/site";
import { IProjectData } from "../../interfaces/project";
import { Hero } from "../../components/project/hero";
import ProjectBody from "../../components/project/content";

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
      {router.isFallback ? (
        <h2>Loading</h2>
      ) : (
        <>
          <Hero project={project} />
          {/* <Content */}
          <ProjectBody content={project.projectFields.content} />

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
