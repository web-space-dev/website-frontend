import styled from "@emotion/styled";
import { getRemSize } from "../../styles/globalCss";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { GridContainer } from "../global/grid/gridContainer";
import { Project, Projects } from "../../interfaces/project";
import { useEffect, useMemo, useRef, useState } from "react";

import { motion, useTransform, useScroll } from "framer-motion";
import ShowcaseItemDesktop from "./showcase/showcase-item-desktop";

import useIsDesktop from "../../hooks/useIsDesktop";
import ShowcaseItemMobile from "./showcase/showcase-item-mobile";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";
import ShowcaseItemMobileAllProjects from "./showcase/showcase-item-mobile-all-projects";
import useIsMobile from "../../hooks/useIsMobile";
import ShowcaseWrapperDesktop from "./showcase/showcase-wrapper-desktop";
import ShowcaseWrapperMobile from "./showcase/showcase-wrapper-mobile";

const StyledSpacer = styled.div<{ height: number }>`
  height: ${({ height }) => height}vh;
`;

interface IStyledWrapper {
  open: boolean;
}

const StyledWrapper = styled(GridContainer)<IStyledWrapper>`
  position: ${({ open }) => (open ? "fixed" : "sticky")};
  height: 100vh;
  z-index: 20;
  background-color: ${colors.black};
  top: 0;
  left: 0;
  right: 0;

  @media (max-width: ${breakpoints.sm}px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledMotionWrapper = styled(motion.div)<IStyledWrapper>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  ${({ open }) => (open ? `height: 100vh;` : `overflow: hidden;`)}
  @media all and (max-width: ${breakpoints.sm}px) {
    display: flex;
    align-items: center;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
  }
`;

const StyledTitle = styled.h2<{ color: string }>`
  transition: 0.3s ease-in-out;
  margin-top: 0;
  font-size: ${getRemSize(dimensions.headingSizes.display2.desktop)};
  text-align: center;
  /* grid-column: 1 / span 12; */
  line-height: 225px;
  color: ${({ color }) => color};
  @media all and (max-width: 1164px) {
    font-size: ${getRemSize(dimensions.headingSizes.display2.desktop - 50)};
  }
  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.display2.mobile)};
    line-height: 72px;
  }
`;

const StyledMobileSpacer = styled.div`
  margin-right: 343px;
  scroll-snap-align: center;
`;

export interface IShowcase {
  title: string;
  projects: Projects;
}

export default function Showcase({ title, projects }: IShowcase) {
  const isMobile = useIsMobile();

  if (isMobile)
    return <ShowcaseWrapperMobile title={title} projects={projects} />;

  return <ShowcaseWrapperDesktop title={title} projects={projects} />;

  return (
    <div style={{ position: "relative" }}>
      <StyledWrapper ref={ref} open={isOpen}>
        <Row>
          <Col start={1} span={12}>
            <StyledTitle color={isOpen ? colors.accent : colors.white}>
              {title}
            </StyledTitle>
          </Col>
        </Row>

        <StyledMotionWrapper open={isOpen}>
          <StyledMobileSpacer />

          {projects.nodes.map((project: Project, index: number) => {
            if (isDesktop) {
              return (
                <ShowcaseItemDesktop
                  key={index}
                  project={project}
                  scale={index === 0 ? scale : undefined}
                  isOpen={isOpen}
                  showAllProjects={index === projects.nodes.length - 1}
                  isFirst={index === 0}
                  isLast={index === projects.nodes.length - 1}
                  reverseScale={reverseScale}
                  forwardScale={forwardScale}
                />
              );
            }

            // return <></>;

            return (
              <>
                <ShowcaseItemMobile
                  key={index}
                  project={project}
                  // isOpen={isOpen}
                  // canSnapScroll={canSnapScroll}
                  // showAllProjects={index === projects.nodes.length - 1}
                  // reverseScale={reverseScale}
                />
                {index === projects.nodes.length - 1 && (
                  <ShowcaseItemMobileAllProjects />
                )}
              </>
            );
          })}
        </StyledMotionWrapper>
      </StyledWrapper>
      <StyledSpacer height={fromStart ? 140 : 100} />
    </div>
  );
}
