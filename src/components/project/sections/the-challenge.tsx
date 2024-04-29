import Image from "next/image";
import { DynamicTextAndImage } from "../../../interfaces/project";
import { Row } from "../../global/grid/Row";
import { Col } from "../../global/grid/Col";
import Pill from "../../global/pill";
import styled from "@emotion/styled";
import { useState } from "react";

interface IProps {
  content: DynamicTextAndImage[];
}
const StyledPillWrapper = styled.div``;

const StyledParagraph = styled.p``;

const StyledImageWrapper = styled.div`
  position: relative;
  & img {
    position: absolute;
    top: 0;
    left: 0;
    // object-fit: cover;
    width: 100px;
    height: auto;
  }
`;

export default function DynamicTextAndImages({ content }: IProps) {
  const [hoverIndex, setHoverIndex] = useState(null);
  // const [hover, setHover] = useState(false);
  const onHover = (index) => {
    // e.preventDefault();
    setHoverIndex(index);
    console.log("hovered");
  };

  const onHoverOver = () => {
    // e.preventDefault  ();
    setHoverIndex(null);
  };
  return (
    <Row>
      <Col start={1} span={5}>
        <StyledPillWrapper>
          <Pill pillText="The Challenge" />
        </StyledPillWrapper>
      </Col>
      {content.map((item, index) => {
        return item?.image ? (
          <Col start={6} span={6}>
            <div
              onMouseEnter={(e) => onHover(index)}
              onMouseLeave={(e) => onHoverOver()}
            >
              <StyledParagraph>{item.text}</StyledParagraph>
              {hoverIndex === index && (
                <StyledImageWrapper>
                  <Image
                    key={index}
                    width={500}
                    height={200}
                    alt={`Gallery Image ${index}`}
                    loader={() => item.image.node.sourceUrl}
                    src={item.image.node.sourceUrl}
                  />
                </StyledImageWrapper>
              )}
            </div>
          </Col>
        ) : (
          <Col start={6} span={6}>
            <StyledParagraph>{item.text}</StyledParagraph>
          </Col>
        );
      })}
    </Row>
  );
}
