import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Gallery } from "../../../../interfaces/project";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { breakpoints, colors } from "../../../../styles/variables";
import ArrowRight from "../../../../icons/arrowRight";
import ArrowLeft from "../../../../icons/arrowLeft";
import useIsTablet from "../../../../hooks/useIsTablet";

interface IProps {
  images: Gallery;
}

const StyledGalleryWrapper = styled.div<{ wrapperHeight: number }>`
  display: flex;
  overflow-y: hidden;
  overflow-x: auto;
  scrollbar-width: none;
  width: 100%;
  height: ${(props) => props.wrapperHeight}px;
  flex-wrap: nowrap;
  margin: 120px 0px;
`;

const StyledImageWrapper = styled.div`
  &:not(:last-child) {
    margin-right: 8px;
  }
  flex: 0 0 auto;

  & img {
    object-fit: cover;
    border-radius: 26px;
    width: 100%;
    height: 100%;
  }
`;

export default function Gallery1Mobile({ images }: IProps) {
  const isTablet = useIsTablet();

  return (
    <StyledGalleryWrapper wrapperHeight={isTablet ? 472 : 236}>
      {images.nodes
        .slice()
        .reverse()
        .map((image, index) => (
          <StyledImageWrapper>
            <Image
              key={index}
              width={isTablet ? 686 : 343}
              height={isTablet ? 472 : 236}
              alt={image.altText}
              loader={() => image.sourceUrl}
              src={image.sourceUrl}
            />
          </StyledImageWrapper>
        ))}
    </StyledGalleryWrapper>
  );
}
