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
    border-radius: 26px;
    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  @media (max-width: ${breakpoints.md}px) {
    flex-direction: column;
    margin-bottom: 120px;
    & img {
      // object-fit: cover;
      height: auto;
      width: 100%;
      border-radius: 26px;
      &:not(:last-child) {
        margin-bottom: 8px;
        margin-right: 0px;
      }
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
            key={index}
            width={isDesktop ? 500 : isTablet ? 686 : 343}
            height={isDesktop ? 768 : isTablet ? 428 : 236}
            alt={`Gallery Image ${index}`}
            loader={() => image.sourceUrl}
            src={image.sourceUrl}
          />
        );
      })}
    </StyledImageWrapper>
  );
}
