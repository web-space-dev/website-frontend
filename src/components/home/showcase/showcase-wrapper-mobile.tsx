import styled from "@emotion/styled";
import { breakpoints, colors, dimensions } from "../../../styles/variables";
import { GridContainer } from "../../global/grid/gridContainer";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { getRemSize } from "../../../styles/globalCss";
import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { Col } from "../../global/grid/Col";
import { Row } from "../../global/grid/Row";
import { IShowcase } from "../showcase";
import ShowcaseItemMobile from "./showcase-item-mobile";
import ShowcaseItemMobileAllProjects from "./showcase-item-mobile-all-projects";
import useDebugPanel from "../../../hooks/useDebugPanel";

const StyledSpacer = styled.div<{ height: number }>`
  height: ${({ height }) => height}vh;
  width: 100vw;
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
  will-change: transform;

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

  ${({ open }) =>
    open
      ? `height: 100vh;`
      : `overflow: hidden;`}/* @media all and (max-width: ${breakpoints.sm}px) {
    display: flex;
    align-items: center;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
  } */
`;

const StyledItemContainer = styled.div`
  overflow-y: scroll;
  /* scroll-snap-type: y mandatory; */

  display: flex;
  align-items: center;
  overflow-x: scroll;
  /* scroll-snap-type: x mandatory; */

  position: relative;
  height: 100vh;
  width: max-content;
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

export default function ShowcaseWrapperMobile({ title, projects }: IShowcase) {
  // old stuff

  const [isOpen, setIsOpen] = useState(false);
  const [canScale, setCanScale] = useState(false);
  const [canSnapScroll, setCanSnapScroll] = useState(false);
  const [breakpoint, setBreakpoint] = useState(0);
  const [beginScalePos, setBeginScalePos] = useState(0);
  const [fromStart, setFromStart] = useState(true);

  const ref = useRef(null);

  const { scrollY } = useScroll();
  const scale = useTransform(
    scrollY,
    [beginScalePos, beginScalePos + 700],
    canScale ? [0.2, 1] : canSnapScroll ? [1, 1] : [0.2, 0.2]
  );

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [isOpen]);

  // const reverseScale = () => {
  //   setCanScale(true);
  //   setIsOpen(false);
  //   setCanSnapScroll(false);
  //   setBreakpoint(0);
  //   setFromStart(true);
  // };

  // const forwardScale = (isOpen: boolean) => {
  //   setIsOpen(isOpen);
  // };

  // new stuff

  const scrollRef = useRef(null);
  const ghostRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportW, setViewportW] = useState(0);

  useLayoutEffect(() => {
    scrollRef && setScrollRange(scrollRef.current.scrollWidth);
  }, [scrollRef]);

  const onResize = useCallback((entries) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width);
    }
  }, []);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => onResize(entries));
    resizeObserver.observe(ghostRef.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  const { scrollYProgress } = useViewportScroll();
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    isOpen && !fromStart ? [0, -scrollRange + viewportW] : [0, 0]
    // [0, -scrollRange + viewportW]
  );
  const physics = { damping: 15, mass: 0.17, stiffness: 80 };
  const spring = useSpring(transform, physics);

  // useEffect(() => {
  //   // console.log("transforming", );
  // }, [scrollYProgress]);

  const debugPanel = useDebugPanel({
    // isOpen,
    // canScale,
    // canSnapScroll,
    breakpoint,
    beginScalePos,
    scrollRange,
    viewportW,
    scrollYProgress: scrollYProgress.get(),
    transform: transform.get(),
    spring: spring.get(),
  });

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
          setFromStart(false);
        }

        // scrollRange - viewportW

        const firstVal = scrollRange - viewportW - 50;
        const secondVal = transform.get() * -1;
        console.log("first value", firstVal, "second value", secondVal);
        console.log("check", firstVal < secondVal);
        if (firstVal < secondVal) {
          console.log("end of scroll");
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [breakpoint, beginScalePos]);

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
        <StyledMotionWrapper
          open={isOpen}
          ref={scrollRef}
          style={{ x: spring }}
        >
          <StyledItemContainer>
            <StyledMobileSpacer />
            {projects.nodes.map((project, index: number) => {
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
          </StyledItemContainer>
        </StyledMotionWrapper>
      </StyledWrapper>
      <StyledSpacer ref={ghostRef} height={scrollRange} />
      {/* <div ref={ghostRef} style={{ height: scrollRange }} className="ghost" /> */}
    </div>
  );
}
