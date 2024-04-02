import styled from "@emotion/styled";
import { getRemSize } from "../../styles/globalCss";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { GridContainer } from "../global/grid/gridContainer";
import { Project, Projects } from "../../interfaces/project";
import { useEffect, useRef, useState } from "react";

import { motion, useTransform, useScroll } from "framer-motion";
import { ShowcaseItem } from "./showcase/showcase-item";
import { ScalingShowcaseItem } from "./showcase/scaling-showcase-item";

const StyledSpacer = styled.div``;

const StyledWrapper = styled(GridContainer)`
  margin: 40px auto;
  position: sticky;
  min-height: 100vh;
  z-index: 20;
  background-color: ${colors.black};
  top: 0;
`;

const StyledMotionWrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 60px;
  left: 0;
  width: 100%;
`;

const StyledTitle = styled.h2<{ color: string }>`
  transition: 0.3s ease-in-out;
  font-size: ${getRemSize(dimensions.headingSizes.display2.desktop)};
  text-align: center;
  grid-column: 1 / span 12;
  line-height: 225px;
  color: ${({ color }) => color};
  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.display2.mobile)};
  }
`;

interface IShowcase {
  title: string;
  projects: Projects;
}

export default function Showcase({ title, projects }: IShowcase) {
  const [isOpen, setIsOpen] = useState(false);
  const [canScale, setCanScale] = useState(false);
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const scale = useTransform(
    scrollY,
    [scrollY.get(), scrollY.get() + 800],
    canScale ? [0.2, 1] : [0.2, 0.2]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { bottom } = ref.current.getBoundingClientRect();

        setCanScale(bottom - window.innerHeight < 1);
        console.log(scale.get());
        if (scale.get() === 1) {
          setIsOpen(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <StyledWrapper ref={ref}>
        <StyledTitle color={isOpen ? colors.accent : colors.white}>
          {title}
        </StyledTitle>
        <StyledMotionWrapper>
          {!isOpen ? (
            <ScalingShowcaseItem project={projects.nodes[0]} scale={scale} />
          ) : (
            projects.nodes.map((project: Project, index: number) => {
              return <ShowcaseItem key={index} project={project} />;
            })
          )}
        </StyledMotionWrapper>
      </StyledWrapper>
      <StyledSpacer />
    </>
  );
}
