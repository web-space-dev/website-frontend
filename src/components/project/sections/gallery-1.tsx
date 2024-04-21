import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Gallery } from "../../../interfaces/project";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { breakpoints, colors } from "../../../styles/variables";
import ArrowRight from "../../../icons/arrowRight";
import ArrowLeft from "../../../icons/arrowLeft";

interface IProps {
  images: Gallery;
}

const StyledGalleryWrapper = styled.div`
  position: relative;
  overflow-x: hidden;
`;

const StyledImagesWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  overflow-y: hidden;
  width: 100%;
  border-radius: 20px;

  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }

  @media (min-width: 900px) {
    justify-content: center; // Center images on larger screens
    overflow: hidden; // Disable scrolling
    width: 100%;
    padding-left: 0;
  }
`;
const StyledImage = styled(motion.div)`
  position: absolute;
  overflow: hidden;
  flex: 0 0 100vw;
  width: 100%;
  // margin-left: -45px;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: flex-start;

  @media (min-width: 900px) {
    max-width: 1440px;
    width: 100%;
    right: 0;
    position: absolute;
  }
`;

const StyledButtonsWrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: 13px;
  right: 13px;
  z-index: 2;

  @media all and (max-width: ${breakpoints.md}px) {
    display: none;
  }
`;

const StyledArrowButton = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 26px;
  background: transparent;
  border: 2px solid ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px;
  z-index: 2;
  cursor: pointer;
`;

const StyledArrowLeft = styled(ArrowLeft)``;

const StyledArrowRight = styled(ArrowRight)``;

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 1000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Gallery1({ images }: IProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.nodes.length, page);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const img = wrapperRef.current.querySelector("img");
      if (img) {
        wrapperRef.current.style.height = `${img.offsetHeight}px`;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <StyledGalleryWrapper>
      <StyledImagesWrapper ref={wrapperRef}>
        <AnimatePresence initial={false} custom={direction}>
          <StyledImage
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <Image
              layout="responsive"
              width={1440}
              height={768}
              alt={`Gallery Image ${page}`}
              loader={() => images.nodes[imageIndex].sourceUrl}
              src={images.nodes[imageIndex].sourceUrl}
            />
          </StyledImage>
        </AnimatePresence>
      </StyledImagesWrapper>
      <StyledButtonsWrapper>
        <StyledArrowButton
          onClick={(e) => {
            e.preventDefault();
            paginate(-1);
          }}
        >
          <StyledArrowLeft fill={colors.white} />
        </StyledArrowButton>
        <StyledArrowButton
          onClick={(e) => {
            e.preventDefault();
            paginate(1);
          }}
        >
          <StyledArrowRight fill={colors.white} />
        </StyledArrowButton>
      </StyledButtonsWrapper>
    </StyledGalleryWrapper>
  );
}
