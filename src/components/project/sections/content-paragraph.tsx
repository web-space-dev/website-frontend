import { ParagraphItem } from "../../../interfaces/project";

interface IProps {
  content: ParagraphItem[];
}

export function ContentParagraph({ content }: IProps) {
  return (
    <div>
      {content.map((paragraph, index) => {
        if (paragraph.title) return <h3 key={index}>{paragraph.title}</h3>;
        if (paragraph.paragraph)
          return <p key={index}>{paragraph.paragraph}</p>;
        if (paragraph.largeParagraph)
          return (
            <p style={{ fontSize: 25 }} key={index}>
              {paragraph.largeParagraph}
            </p>
          );
      })}
    </div>
  );
}
