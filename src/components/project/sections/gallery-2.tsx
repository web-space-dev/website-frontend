import Image from "next/image";
import { Gallery } from "../../../interfaces/project";

interface IProps {
  images: Gallery;
}

export default function Gallery2({ images }: IProps) {
  return (
    <div>
      {images.nodes.map((image, index) => {
        return (
          <Image
            key={index}
            width={500}
            height={200}
            alt={`Gallery Image ${index}`}
            loader={() => image.sourceUrl}
            src={image.sourceUrl}
          />
        );
      })}
    </div>
  );
}
