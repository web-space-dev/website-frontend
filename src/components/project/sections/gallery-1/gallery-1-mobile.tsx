import React from "react";
import Image from "next/image";
import { Gallery } from "../../../../interfaces/project";
import styled from "@emotion/styled";
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
  max-width: 90%;

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
      {images.nodes.map((image, index) => (
        <StyledImageWrapper key={index}>
          <Image
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
