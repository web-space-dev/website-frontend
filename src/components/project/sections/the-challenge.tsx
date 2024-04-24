import Image from "next/image";
import { DynamicTextAndImage } from "../../../interfaces/project";

interface IProps {
  content: DynamicTextAndImage[];
}

export default function DynamicTextAndImages({ content }: IProps) {
  return (
    <>
      <p>Neve check here</p>
      {content.map((item, index) => {
        return (
          <>
            <p>{item.text}</p>
            {item.image && (
              <Image
                key={index}
                width={500}
                height={200}
                alt={`Gallery Image ${index}`}
                loader={() => item.image.node.sourceUrl}
                src={item.image.node.sourceUrl}
              />
            )}
          </>
        );
      })}
    </>
  );
}
