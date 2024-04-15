import styled from "@emotion/styled";
import { getRemSize } from "../../styles/globalCss";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { GridContainer } from "../global/grid/gridContainer";
import { Project, Projects } from "../../interfaces/project";
import { useEffect, useMemo, useRef, useState } from "react";

import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { ShowcaseItem } from "./showcase/showcase-item";
import { set } from "date-fns";
import { ShowcaseScale } from "./showcase/showcase-scale";

const StyledSpacer = styled.div`
  height: 100vh;
`;

interface IStyledWrapper {
  isOpen: boolean;
}
const StyledWrapper = styled(GridContainer)<IStyledWrapper>`
  /* margin: 40px auto; */
  /* position: "fixed"; */
  position: ${({ isOpen }) => (isOpen ? "fixed" : "sticky")};
  /* height: ${({ isOpen }) => (isOpen ? "3000px" : "100vh")}; */
  min-height: 100vh;
  z-index: 20;
  background-color: ${colors.black};
  top: 0;
  ${({ isOpen }) =>
    isOpen &&
    `
    // height: 3000px;
    // background-color: red;
    overflow-y: scroll;
  `}
`;

const StyledMotionWrapper = styled(motion.div)<IStyledWrapper>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  ${({ isOpen }) =>
    isOpen &&
    `
    height: 100vh;
    `}
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
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [canScale, setCanScale] = useState(false);
  const [breakpoint, setBreakpoint] = useState(0);
  const [beginScalePos, setBeginScalePos] = useState(0);

  const { scrollY } = useScroll();
  const scale = useTransform(
    scrollY,
    [beginScalePos, beginScalePos + 800],
    canScale ? [0.2, 1] : [0.2, 0.2]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { bottom } = ref.current.getBoundingClientRect();

        if (bottom - window.innerHeight < 1) {
          setCanScale(true);
          if (beginScalePos === 0) {
            setBeginScalePos(scrollY.get());
          }
        } else {
          // setCanScale(false);
        }

        if (breakpoint !== 0 && scrollY.get() < breakpoint) {
          setCanScale(true);
          setIsOpen(false);
        }

        if (scale.get() === 1) {
          setIsOpen(true);
          setBreakpoint(scrollY.get());
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [breakpoint, beginScalePos]);

  return (
    <>
      {isOpen && <StyledSpacer />}
      <StyledWrapper ref={ref} isOpen={isOpen}>
        <StyledTitle color={isOpen ? colors.accent : colors.white}>
          {title}
        </StyledTitle>
        <StyledMotionWrapper isOpen={isOpen}>
          {projects.nodes.map((project: Project, index: number) => {
            return (
              <ShowcaseItem
                key={index}
                project={project}
                scale={index === 0 ? scale : undefined}
                isOpen={isOpen}
                showAllProjects={index === projects.nodes.length - 1}
              />
            );
          })}

          {/* <ShowcaseItem key={index} project={project}  />; */}
          {/* ) : ( */}
          {/* projects.nodes.map((project: Project, index: number) => { */}
          {/* return <ShowcaseItem key={index} project={project} />; */}
          {/* }) */}
          {/* )} */}
        </StyledMotionWrapper>
      </StyledWrapper>
      <StyledSpacer />
    </>
  );
}
