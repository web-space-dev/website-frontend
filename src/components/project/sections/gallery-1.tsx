import React, { useState } from "react";
import Image from "next/image";
import { Gallery } from "../../../interfaces/project";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { Row } from "../../global/grid/Row";
import { Col } from "../../global/grid/Col";
import { breakpoints, colors } from "../../../styles/variables";
import ArrowRight from "../../../icons/arrowRight";
import ArrowLeft from "../../../icons/arrowLeft";

interface IProps {
  images: Gallery;
}

const StyledGalleryWrapper = styled.div`
  position: relative;
  border-radius: 20px;
`;

const StyledImagesWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 768px;
  overflow: hidden;
  border-radius: 20px;
  user-select: none;
  cursor: pointer;

  & img {
    object-fit: cover;
    border-radius: 20px;
  }
`;
const StyledImage = styled(motion.div)`
  position: absolute;
  width: 100%;
  max-width: 1440px;
  border-radius: 20px;
`;

const StyledButtonsWrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: 13px;
  right: 74px;
  z-index: 2;

  @media (max-width: 1600px) {
    bottom: 17px;
    right: 79px;
  }

  @media (max-width: 1519px) {
    bottom: 17px;
    right: 36px;
  }

  @media (max-width: 1503px) {
    bottom: 17px;
    right: 29px;
  }

  @media (max-width: 1473px) {
    bottom: 17px;
    right: 17px;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    display: none;
  }
`;

const StyledArrowButton = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 26%;
  background: transparent;
  border: 2px solid ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px;
  z-index: 2;
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

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <Col start={1} span={12}>
      <StyledGalleryWrapper>
        <StyledImagesWrapper>
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
                console.log("hello");
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <Image
                // layout="responsive"
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
    </Col>
  );
}
