import styled from "@emotion/styled";
import { Project } from "../../../interfaces/project";
import Link from "next/link";
import { colors, dimensions } from "../../../styles/variables";
import { getRemSize } from "../../../styles/globalCss";
import { IconButton } from "../../global/iconButton";
import { CustomImage } from "../../global/image";
import { MotionValue, motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface IStyledShowcaseWrapper {
  open: boolean;
}
const StyledShowcaseWrapper = styled(motion.div)<IStyledShowcaseWrapper>`
  height: 100vh;
  display: flex;
  align-items: center;
  perspective: 500px;
  scroll-snap-align: ${({ open }) => (open ? "start" : "none")};
`;

const StyledShowcaseDetails = styled(motion.div)`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  height: -webkit-fill-available;
  margin: 40px auto;
  max-width: 1448px;
`;

const StyledAllProjects = styled.div`
  display: flex;
  flex: 1;
  background-color: ${colors.blackLight};
  border: 2px solid ${colors.white};
  border-radius: 12px;
  backdrop-filter: blur(10px);
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  height: -webkit-fill-available;
  margin: auto 10px;
`;

const StyledShowcaseImage = styled(motion.div)`
  height: 100%;
  flex: 1;
  margin: auto 10px;

  & img {
    object-fit: cover;
    height: 100%;
    border-radius: 12px;
  }
`;

const StyledShowcaseContent = styled(Link)`
  position: absolute;
  top: 50%;
  bottom: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 15px;

  & h3,
  p {
    margin: 0 15px;
  }
`;

const StyledShowcaseTitle = styled(motion.h3)`
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  font-weight: 400;
`;

const StyledShowcaseCategory = styled(motion.p)`
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  font-weight: 400;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 15px;
  & h3 {
    margin: 0;
    transition: 0.3s ease;
  }

  &:hover {
    h3 {
      color: ${colors.accent};
    }
    button {
      background-color: ${colors.accent};
      border-color: ${colors.accent};
    }
    path {
      fill: ${colors.white};
    }
  }
`;

interface ShowcaseItemProps {
  project: Project;
  scale?: MotionValue;
  isOpen: boolean;
  showAllProjects: boolean;
  isFirst: boolean;
  isLast: boolean;
  reverseScale: () => void;
  forwardScale: (param: boolean) => void;
}

export default function ShowcaseItemDesktop({
  project,
  scale,
  isOpen,
  showAllProjects,
  isFirst,
  isLast,
  reverseScale,
  forwardScale,
}: ShowcaseItemProps) {
  const ref = useRef(null);
  const scrollRef = useRef(
    typeof window !== "undefined"
      ? { y: window.pageYOffset, direction: null }
      : { y: 0, direction: null }
  );
  const [listening, setListening] = useState(false);

  useEffect(() => {
    /**
     * Checking if the user is trying to scroll up, if so,
     * let them scroll a tiny bit (`wiggleRoom`) and then we start
     * to reverse the scale
     * @param e WheelEvent
     */
    const wiggleRoom = 200;
    const handleScrollUp = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        scrollRef.current.y -= e.deltaY;
        if (scrollRef.current.y > wiggleRoom) {
          reverseScale();
          scrollRef.current.y = 0; // Reset the counter
        }
      } else {
        scrollRef.current.y = 0; // Reset the counter if the user scrolls down
      }
    };
    const handleScrollDown = (e: WheelEvent) => {
      // User is scrolling down
      scrollRef.current.y += e.deltaY;
      if (scrollRef.current.y > wiggleRoom) {
        forwardScale(false);
        scrollRef.current.y = 0; // Reset the counter
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isFirst || isLast) {
          /**
           * Checking if it's the first element AND if it's in view
           * (we know that because scale will be defined)
           */
          if (entry.isIntersecting && !listening) {
            // Oh also we check if the window is defined because of SSR
            if (typeof window !== "undefined") {
              setListening(true);

              window.addEventListener(
                "wheel",
                isFirst ? handleScrollUp : handleScrollDown
              );
            }
          } else {
            // Element is not in view, remove the event listener
            if (typeof window !== "undefined") {
              window.removeEventListener(
                "wheel",
                isFirst ? handleScrollUp : handleScrollDown
              );

              setListening(false);
            }
          }
          if (isLast && entry.isIntersecting && !isOpen) {
            forwardScale(true);
          }
        }
      },
      { threshold: 1.0 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      if (typeof window !== "undefined") {
        // window.removeEventListener("wheel", handleScroll);
        window.removeEventListener(
          "wheel",
          isFirst ? handleScrollUp : handleScrollDown
        );
      }
    };
  }, []);

  return (
    <StyledShowcaseWrapper
      layout
      transition={{ duration: 1 }}
      open={isOpen}
      ref={ref}
      style={scale ? { scale } : {}}
    >
      <StyledShowcaseDetails>
        <StyledShowcaseImage>
          <CustomImage
            alt={project.featuredImage.node.altText}
            width={1448}
            height={800}
            src={project.featuredImage.node.sourceUrl}
            blurDataURL={project.featuredImage.node.placeholderDataURI}
          />
          <StyledShowcaseContent href={`/projects/${project.slug}`}>
            <StyledShowcaseTitle>{project.title}</StyledShowcaseTitle>
            <StyledShowcaseCategory>
              {project.projectCategories?.nodes[0]?.name}
            </StyledShowcaseCategory>
          </StyledShowcaseContent>
        </StyledShowcaseImage>

        {showAllProjects && (
          <StyledAllProjects>
            <StyledLink href="/projects">
              <StyledShowcaseTitle>All projects</StyledShowcaseTitle>
              <IconButton />
            </StyledLink>
          </StyledAllProjects>
        )}
      </StyledShowcaseDetails>
    </StyledShowcaseWrapper>
  );
}
