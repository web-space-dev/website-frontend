import styled from "@emotion/styled";
import { SkillCategories } from "../../interfaces/home";
import { GridContainer } from "../global/grid/gridContainer";
import { colors, dimensions } from "../../styles/variables";
import { useState } from "react";
import { motion } from "framer-motion";
import { css } from "@emotion/css";

const StyledWrapper = styled(GridContainer)`
  margin: 140px auto;
`;

const StyledHeading = styled.h2`
  grid-column: 1 / span 12;
  text-align: center;
`;

const StyledSkillsWrapper = styled.div`
  grid-column: 3 / span 8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLogoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 80%;
  margin: auto;
`;

const StyledTabs = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  border: 1px solid ${colors.accentLight};
  border-radius: 20px;
  padding: 10px;
  width: fit-content;
`;
const StyledTab = styled.button<{ isActive: boolean }>`
  position: relative;
  /* padding: 1.5rem 3rem; */
  /* font-size: 1rem; */
  /* font-weight: 500; */
  font-size: 32px;
  font-weight: 500;
  color: ${colors.white};
  /* outline: 2px solid skyblue; */
  border-radius: 9999px;
  transition: all 0.3s ease;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;

  ${(props) =>
    !props.isActive &&
    css`
      &:hover {
        background-color: ${colors.accentLight};
        /* color: rgba(255, 255, 255, 0.6); */
      }
    `}
`;

const Bubble = styled(motion.span)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: ${colors.accentLight};
  mix-blend-mode: difference;
  border-radius: 14px;
`;

interface ISkills {
  title: string;
  categories: SkillCategories;
}

export default function Skills({ title, categories }: ISkills) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <StyledWrapper>
      <StyledHeading>{title}</StyledHeading>
      <StyledSkillsWrapper>
        <StyledLogoWrapper>
          {categories.nodes.map((category, index) => {
            return category.skills.nodes.map((skill, index) => (
              <img
                key={index}
                src={skill.featuredImage.node.sourceUrl}
                alt={skill.title + "Logo"}
              />
            ));
          })}
        </StyledLogoWrapper>
        <StyledTabs>
          {categories.nodes.map((category, index) => (
            <StyledTab
              key={category.name}
              onClick={() => setActiveTab(index)}
              isActive={activeTab === index}
            >
              {activeTab === index && (
                <Bubble
                  layoutId="bubble"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {category.name}
            </StyledTab>
          ))}
        </StyledTabs>
      </StyledSkillsWrapper>
    </StyledWrapper>
  );
}
