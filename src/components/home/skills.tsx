import styled from "@emotion/styled";
import { SkillCategories } from "../../interfaces/home";
import { GridContainer } from "../global/grid/gridContainer";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getRemSize } from "../../styles/globalCss";
import SkillsDesktop from "./skills/skillsDesktop";
import useIsDesktop from "../../hooks/useIsDesktop";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";

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
    font-size: ${getRemSize(dimensions.headingSizes.medium.mobile)};
  }
`;

const StyledSkillsWrapper = styled.div`
  grid-column: 3 / span 8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ISkills {
  title: string;
  categories: SkillCategories;
}

export default function Skills({ title, categories }: ISkills) {
  const isDesktop = useIsDesktop();
  return (
    <StyledWrapper>
      <Row>
        <Col start={3} span={8}>
          <StyledHeading>{title}</StyledHeading>
        </Col>
      </Row>
      <Row>
        <Col start={3} span={8}>
          <StyledSkillsWrapper>
            {isDesktop ? (
              <SkillsDesktop categories={categories} />
            ) : (
              <p>Mobile view</p>
            )}
          </StyledSkillsWrapper>
        </Col>
      </Row>
    </StyledWrapper>
  );
}
