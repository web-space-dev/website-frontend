import Image from "next/image";
import { DynamicTextAndImage } from "../../../interfaces/project";

interface IProps {
  content: DynamicTextAndImage[];
}

export default function DynamicTextAndImages({ content }: IProps) {
  return (
    <>
      {content.map((item, index) => {
        <p>{item.text}</p>;
        {
          item.image && (
            <Image
              key={index}
              width={500}
              height={200}
              alt={`Gallery Image ${index}`}
              src={item.image.node.sourceUrl}
            />
          );
        }
      })}
    </>
  );
}
