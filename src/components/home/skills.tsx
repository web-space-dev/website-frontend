import styled from "@emotion/styled";
import { SkillCategories } from "../../interfaces/home";
import { GridContainer } from "../global/grid/gridContainer";
import { colors } from "../../styles/variables";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

const StyledLogoWrapper = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 80%;
  margin: auto;
  height: 315px;
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
  font-size: 32px;
  font-weight: 500;
  color: ${colors.white};
  border-radius: 9999px;
  transition: all 0.3s ease;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;
  &:hover {
    text-decoration: none;
  }
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
        <AnimatePresence mode="wait">
          <StyledLogoWrapper
            key={activeTab}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {categories.nodes[activeTab].skills.nodes.map((skill, index) => (
              <img
                key={index}
                src={skill.featuredImage.node.sourceUrl}
                alt={skill.title + "Logo"}
              />
            ))}
          </StyledLogoWrapper>
        </AnimatePresence>

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
