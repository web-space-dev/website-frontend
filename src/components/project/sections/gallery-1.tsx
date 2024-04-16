import React, { useState } from "react";
import Image from "next/image";
import { Gallery } from "../../../interfaces/project";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

interface IProps {
  images: Gallery;
}

const StyledImagesWrapper = styled.div`
position:relative
  display: flex;
  width: 100%;
  height: 768px;
  overflow: hidden;
`;
const StyledImage = styled(motion.div)`
  position: absolute;
  top: 902px;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1440 : -1440,
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
      x: direction < 0 ? 1440 : -1440,
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
    <>
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
              layout="fill"
              objectFit="cover"
              alt={`Gallery Image ${page}`}
              loader={() => images.nodes[imageIndex].sourceUrl}
              src={images.nodes[imageIndex].sourceUrl}
            />
          </StyledImage>
        </AnimatePresence>
      </StyledImagesWrapper>
      <>
        <button
          onClick={(e) => {
            e.preventDefault();
            paginate(1);
          }}
        >
          Next Image
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            paginate(-1);
          }}
        >
          Previous Image
        </button>
      </>
    </>
  );
}
