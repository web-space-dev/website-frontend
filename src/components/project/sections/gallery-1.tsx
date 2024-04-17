import React, { useState } from "react";
import Image from "next/image";
import { Gallery } from "../../../interfaces/project";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { Row } from "../../global/grid/Row";
import { Col } from "../../global/grid/Col";
import { colors } from "../../../styles/variables";
import ArrowRight from "../../../icons/arrowRight";
import ArrowLeft from "../../../icons/arrowLeft";

interface IProps {
  images: Gallery;
}

const StyledImagesWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 768px;
`;
const StyledImage = styled(motion.div)`
  position: absolute;
  max-width: 100vw;
  border-radius: 20px;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: -662px;
  left: 941px;
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
    zIndex: -1,
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

const swipeConfidenceThreshold = 10000;
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
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <Image
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
    </Col>
  );
}
