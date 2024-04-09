import styled from "@emotion/styled";
import { SkillCategories, Skills as IAllSkills } from "../../interfaces/home";
import { GridContainer } from "../global/grid/gridContainer";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getRemSize } from "../../styles/globalCss";
import SkillsDesktop from "./skills/skillsDesktop";
import useIsDesktop from "../../hooks/useIsDesktop";

const StyledWrapper = styled(GridContainer)`
  margin: 140px auto;
`;

const StyledHeading = styled.h2`
  grid-column: 3 / span 8;
  text-align: center;
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  font-weight: 500;
  @media all and (max-width: ${breakpoints.md}px) {
    grid-column: 1 / span 12;
    font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
  }
`;

const StyledSkillsWrapper = styled.div`
  grid-column: 1 / span 12;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SkillsMobile = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  img {
    height: auto;
    margin: 13px;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    img {
      width: 180px;
    }
  }

  @media (max-width: 700px) {
    img {
      width: 136px;
    }
  }

  @media (max-width: 555px) {
    img {
      width: 105px;
    }
  }

  @media (max-width: 440px) {
    img {
      width: 77px;
    }
  }
`;

const StyledText = styled.p`
  font-size: ${getRemSize(dimensions.headingSizes.cta.mobile)};
  text-align: center;
`;

interface ISkills {
  title: string;
  categories: SkillCategories;
  skills: IAllSkills;
}

export default function Skills({ title, categories, skills }: ISkills) {
  const isDesktop = useIsDesktop();
  return (
    <StyledWrapper>
      <StyledHeading>{title}</StyledHeading>
      <StyledSkillsWrapper>
        {isDesktop ? (
          <SkillsDesktop categories={categories} />
        ) : (
          <>
            <SkillsMobile>
              {skills.nodes.map((skill, index) => {
                return (
                  // <Skill>
                  <img
                    key={index}
                    src={skill.featuredImage.node.sourceUrl}
                    alt={skill.title + "Logo"}
                  />
                  // </Skill>
                );
              })}
            </SkillsMobile>
            <StyledText>10+ frame works & systems</StyledText>
          </>
        )}
      </StyledSkillsWrapper>
    </StyledWrapper>
  );
}
