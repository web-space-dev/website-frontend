import Image from "next/image";
import { DynamicTextAndImage } from "../../../interfaces/project";
import { Row } from "../../global/grid/Row";
import { Col } from "../../global/grid/Col";
import Pill from "../../global/pill";
import styled from "@emotion/styled";

interface IProps {
  content: DynamicTextAndImage[];
}
const StyledPillWrapper = styled.div``;

const StyledParagraph = styled.p``;

const StyledImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export default function DynamicTextAndImages({ content }: IProps) {
  return (
    <Row>
      <Col start={1} span={5}>
        <StyledPillWrapper>
          <Pill pillText="The Challenge" />
        </StyledPillWrapper>
      </Col>
      {content.map((item, index) => {
        return (
          <>
            <Col start={6} span={6}>
              <StyledParagraph>{item.text}</StyledParagraph>
            </Col>
            {item.image && (
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
          </>
        );
      })}
    </Row>
  );
}
