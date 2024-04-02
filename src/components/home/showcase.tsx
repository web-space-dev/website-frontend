import styled from "@emotion/styled";
import { getRemSize } from "../../styles/globalCss";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { GridContainer } from "../global/grid/gridContainer";
import { Project, Projects } from "../../interfaces/project";
import { useEffect, useRef, useState } from "react";

import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { ShowcaseItem } from "./showcase/showcase-item";
import { set } from "date-fns";

const StyledSpacer = styled.div`
  height: 100vh;
`;

interface IStyledWrapper {
  isOpen: boolean;
}
const StyledWrapper = styled(GridContainer)<IStyledWrapper>`
  margin: 40px auto;
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

const StyledMotionWrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
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
  const [breakpoint, setBreakpoint] = useState(0);
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const scale = useTransform(
    scrollY,
    [scrollY.get(), scrollY.get() + 800],
    canScale ? [0.2, 1] : [0.2, 0.2]
  );

  // const { scrollYProgress } = useScroll();
  // const scaleX = useSpring(scrollY, {
  //   stiffness: 100,
  //   damping: 30,
  //   restDelta: 0.001
  // });

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { bottom } = ref.current.getBoundingClientRect();

        // setCanScale(bottom - window.innerHeight < 1);
        if (bottom - window.innerHeight < 1) {
          setCanScale(true);
        } else {
          setCanScale(false);
          // setBreakpoint(0);
        }

        console.log("scrollY", scrollY.get(), breakpoint, canScale);
        if (breakpoint !== 0 && scrollY.get() < breakpoint) {
          console.log("reverse!", canScale);
          setCanScale(true);
          setIsOpen(false);
          setBreakpoint(0);
        }

        if (scale.get() === 1) {
          setIsOpen(true);
          setBreakpoint(scrollY.get() + 100);
          console.log("breakpoint", scrollY.get() + 100);
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
      {isOpen && <StyledSpacer />}
      <StyledWrapper ref={ref} isOpen={isOpen}>
        <StyledTitle color={isOpen ? colors.accent : colors.white}>
          {title}
        </StyledTitle>
        <StyledMotionWrapper>
          {!isOpen ? (
            <ShowcaseItem project={projects.nodes[0]} scale={scale} />
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
