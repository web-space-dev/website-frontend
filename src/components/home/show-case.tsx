import Link from "next/link";

import styled from "@emotion/styled";
import { getRemSize } from "../../styles/globalCss";
import { colors, dimensions } from "../../styles/variables";
import { GridContainer } from "../global/grid/GridContainer";
import { Project, Projects } from "../../interfaces/project";
import { IconButton } from "../global/icon-button";
import { CustomImage } from "../global/image";
import { useState } from "react";

import { motion, useViewportScroll, useTransform } from "framer-motion";
import { ShowcaseItem } from "./showcase/showcase-item";

const StyledWrapper = styled(GridContainer)`
  margin: 40px 0;
  position: relative;
`;

const StyledMotionWrapper = styled(motion.div)`
  position: absolute;
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
  const scale = useTransform(scrollYProgress, [0, 3], [0, 1.8]);

  return (
    <StyledWrapper>
      <StyledTitle color={isOpen ? colors.accent : colors.white}>
        {title}
      </StyledTitle>
      <StyledMotionWrapper
        className="container"
        style={{
          scale,
        }}
      >
        {projects.nodes.map((project: Project, index: number) => {
          if (index !== 1) return null;
          return (
            <motion.div
              key={index}
              // style={{
              //   scaleY: scrollYProgress,
              // }}
            >
              <ShowcaseItem key={index} project={project} />
            </motion.div>
          );
        })}
      </StyledMotionWrapper>
    </StyledWrapper>
  );
}
