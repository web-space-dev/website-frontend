import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/layout";
import {
  getAllProjectsWithSlug,
  getProjectAndMoreProjects,
  getSiteData,
} from "../../lib/api";
import { ISiteData } from "../../interfaces/site";
import { IProjectData } from "../../interfaces/project";
import { Hero } from "../../components/project/hero";
import ProjectBody from "../../components/project/content";
import { GridContainer } from "../../components/global/grid/gridContainer";
import Navbar from "../../components/navbar";

interface IProject extends IProjectData {
  siteData: ISiteData;
}

export default function Project({ siteData, project, projects }: IProject) {
  const router = useRouter();

  if (!project || (!router.isFallback && !project?.slug)) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout pageTitle={project?.title} siteData={siteData}>
      <Navbar dark={true} />

      {router.isFallback ? (
        <h2>Loading</h2>
      ) : (
        <>
          <GridContainer>
            <Hero project={project} />
            {/* <Content */}
            <ProjectBody content={project.projectFields.content} />

            {/* Other Projects */}
            {/* <h2>Other projects</h2>
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
            ))} */}
          </GridContainer>
        </>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = typeof params.slug === "string" ? params.slug : params.slug[0];
  const { project, projects } = await getProjectAndMoreProjects(slug);
  const siteData = await getSiteData();

  return {
    props: {
      siteData,
      project,
      projects,
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
