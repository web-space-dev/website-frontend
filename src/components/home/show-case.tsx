// import Link from "next/link";

import styled from "@emotion/styled";
import { getRemSize } from "../../styles/globalCss";
import { colors, dimensions } from "../../styles/variables";
import { GridContainer } from "../global/grid/GridContainer";
import { Project, Projects } from "../../interfaces/project";
import { IconButton } from "../global/icon-button";
import { CustomImage } from "../global/image";
import { useEffect, useState } from "react";

import { Link, animateScroll as scroll, Events, scrollSpy } from "react-scroll";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { ShowcaseItem } from "./showcase/showcase-item";

const StyledSpacer = styled.div`
  /* height: 100vh; */
`;

const StyledWrapper = styled(GridContainer)`
  margin: 40px auto;
  position: relative;
  top: 0;
`;

const StyledMotionWrapper = styled.div`
  position: aboslute;
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.h2<{ color: string }>`
  font-size: ${getRemSize(dimensions.headingSizes.large)};
  text-align: center;
  grid-column: 1 / span 12;
  line-height: 225px;
  color: ${({ color }) => color};
`;

interface IShowcase {
  title: string;
  projects: Projects;
}

export default function Showcase({ title, projects }: IShowcase) {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useViewportScroll();
  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 1],
    [0, 0.1, 0.4, 1]
  );
  const scaleY = useTransform(scrollYProgress, [0, 0.5, 1], [1, 3, 1]);
  const displayIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, projects.nodes.length - 1],
    {
      clamp: false,
    }
  );

  return (
    <>
      <StyledWrapper>
        <StyledTitle color={isOpen ? colors.accent : colors.white}>
          {title}
        </StyledTitle>
        <StyledMotionWrapper>
          {projects.nodes.map((project: Project, index: number) => {
            if (Math.floor(displayIndex.get()) !== index) return null;
            return (
              <ShowcaseItem
                style={{
                  scale: scaleX,
                  // scaleY: scaleY,
                }}
                key={index}
                project={project}
              />
            );
          })}
        </StyledMotionWrapper>
      </StyledWrapper>
      <StyledSpacer />
    </>
  );
}
