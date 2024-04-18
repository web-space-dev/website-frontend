import styled from "@emotion/styled";
import { getRemSize } from "../../styles/globalCss";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { GridContainer } from "../global/grid/gridContainer";
import { Project, Projects } from "../../interfaces/project";
import { useEffect, useMemo, useRef, useState } from "react";

import { motion, useTransform, useScroll } from "framer-motion";
import ShowcaseItemDesktop from "./showcase/showcase-item-desktop";

import useIsDesktop from "../../hooks/useIsDesktop";
import ShowcaseItemMobile from "./showcase/shocase-item-mobile";

const StyledSpacer = styled.div`
  height: 100vh;
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
  @media all and (max-width: ${breakpoints.md}px) {
    display: flex;
    align-items: center;
  }
`;

const StyledTitle = styled.h2<{ color: string }>`
  transition: 0.3s ease-in-out;
  font-size: ${getRemSize(dimensions.headingSizes.display2.desktop)};
  text-align: center;
  grid-column: 1 / span 12;
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

interface IShowcase {
  title: string;
  projects: Projects;
}

export default function Showcase({ title, projects }: IShowcase) {
  const [isOpen, setIsOpen] = useState(false);
  const [canScale, setCanScale] = useState(false);
  const [canSnapScroll, setCanSnapScroll] = useState(false);
  const [breakpoint, setBreakpoint] = useState(0);
  const [beginScalePos, setBeginScalePos] = useState(0);

  const ref = useRef(null);
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const scale = useTransform(
    scrollY,
    [beginScalePos, beginScalePos + 1200],
    canScale ? [0.2, 1] : canSnapScroll ? [1, 1] : [0.2, 0.2]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { bottom } = ref.current.getBoundingClientRect();

        if (bottom - window.innerHeight < 1 && !breakpoint) {
          setCanScale(true);
          if (beginScalePos === 0) {
            setBeginScalePos(scrollY.get());
          }
        }

        if (scale.get() === 1 && breakpoint === 0) {
          setIsOpen(true);
          setCanSnapScroll(true);
          setBreakpoint(scrollY.get());
          setCanScale(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [breakpoint, beginScalePos]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const reverseScale = () => {
    setCanScale(true);
    setIsOpen(false);
    setCanSnapScroll(false);
    setBreakpoint(0);
  };

  // const debugPanel = useDebugPanel({
  //   isOpen,
  //   canScale,
  //   canSnapScroll,
  //   breakpoint,
  //   beginScalePos,
  //   fps,
  //   scrollY: scrollY.get(),
  // });

  return (
    <>
      {/* {debugPanel} */}
      <StyledWrapper ref={ref} open={isOpen}>
        <StyledTitle color={isOpen ? colors.accent : colors.white}>
          {title}
        </StyledTitle>
        <StyledMotionWrapper open={isOpen}>
          {projects.nodes.map((project: Project, index: number) => {
            if (isDesktop) {
              return (
                <ShowcaseItemDesktop
                  key={index}
                  project={project}
                  scale={index === 0 ? scale : undefined}
                  isOpen={isOpen}
                  showAllProjects={index === projects.nodes.length - 1}
                  reverseScale={reverseScale}
                />
              );
            }

            return (
              <ShowcaseItemMobile
                key={index}
                project={project}
                // isOpen={isOpen}
                // canSnapScroll={canSnapScroll}
                // showAllProjects={index === projects.nodes.length - 1}
                // reverseScale={reverseScale}
              />
            );
          })}
        </StyledMotionWrapper>
      </StyledWrapper>
      <StyledSpacer />
    </>
  );
}
