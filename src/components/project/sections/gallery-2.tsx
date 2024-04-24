import Image from "next/image";
import { Gallery } from "../../../interfaces/project";
import styled from "@emotion/styled";

interface IProps {
  images: Gallery;
}
const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const StyledImage = styled(Image)`
  object-fit: none;
`;
export default function Gallery2({ images }: IProps) {
  return (
    <ImagesWrapper>
      {images.nodes.map((image, index) => {
        return (
          <Image
            key={index}
            width={500}
            height={768}
            alt={`Gallery Image ${index}`}
            loader={() => image.sourceUrl}
            src={image.sourceUrl}
          />
        );
      })}
    </ImagesWrapper>
  );
}
