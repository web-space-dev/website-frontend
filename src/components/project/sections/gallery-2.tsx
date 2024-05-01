import Image from "next/image";
import { Gallery } from "../../../interfaces/project";
import styled from "@emotion/styled";
import { breakpoints } from "../../../styles/variables";
import useIsDesktop from "../../../hooks/useIsDesktop";
import useIsTablet from "../../../hooks/useIsTablet";

interface IProps {
  images: Gallery;
}
const StyledImageWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 180px;
  & img {
    object-fit: cover;
    width: auto;
    height: 768px;
    border-radius: 26px;
    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  @media (max-width: ${breakpoints.md}px) {
    flex-direction: column;
    margin-bottom: 120px;

    & img.first-image {
      object-fit: cover;
      width: 100%;
      height: 428px;
      border-radius: 26px;
      margin-bottom: 8px;
      margin-right: 0px;
    }
    & img.other-image {
      object-fit: cover;
      height: auto;
      width: 100%;
      border-radius: 26px;
      &:not(:last-child) {
        margin-bottom: 8px;
        margin-right: 0px;
      }
    }
  }

  @media (max-width: ${breakpoints.sm}px) {
    & img.first-image {
      height: 236px;
      width: 100%;
    }
    & img.other-image {
      height: auto;
      width: 100%;
    }
  }
`;

export default function Gallery2({ images }: IProps) {
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();
  return (
    <StyledImageWrapper>
      {images.nodes.map((image, index) => {
        return (
          <Image
            className={index === 0 ? "first-image" : "other-image"}
            key={index}
            width={isDesktop ? 500 : isTablet ? 686 : 343}
            height={isDesktop ? 768 : isTablet ? 428 : 236}
            alt={`Gallery Image ${index}`}
            src={image.sourceUrl}
          />
        );
      })}
    </StyledImageWrapper>
  );
}
