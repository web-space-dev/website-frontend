import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/global/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";

import { getHomeData, getSiteData } from "../lib/api";
import { IHomePage } from "../interfaces";
import { ISiteData } from "../interfaces/site";
import Hero from "../components/home/Hero";
import WhatWeDo from "../components/home/WhatWeDo";
import Showcase from "../components/home/ShowCase";
import Skills from "../components/home/Skills";
import Approach from "../components/home/Approach";

interface IIndex {
  siteData: ISiteData;
  pageData: IHomePage;
  preview: boolean;
}

export default function Index({ siteData, pageData, preview }: IIndex) {
  const { page, projects, skillCategories } = pageData;

  return (
    <Layout preview={preview} pageTitle={page.title} siteData={siteData}>
      {/* Hero section */}
      <Hero title={page.homeFields.heroTitle} />

      {/* What we do */}
      <WhatWeDo items={page.homeFields.whatWeDo} />
      {/* Showcase */}
      <Showcase title={page.homeFields.showcaseTitle} projects={projects} />

      {/* Skills */}
      <Skills
        title={page.homeFields.skillsTitle}
        categories={skillCategories}
      />

      {/* Approach */}
      <Approach items={page.homeFields.approach} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const pageData = await getHomeData(preview);
  const siteData = await getSiteData();

  return {
    props: { siteData, pageData, preview },
    revalidate: 10,
  };
};
