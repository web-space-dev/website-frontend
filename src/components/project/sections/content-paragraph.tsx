import { ParagraphItem } from "../../../interfaces/project";
import { Col } from "../../global/grid/Col";
import { getRemSize } from "../../../../src/styles/globalCss";
import styled from "@emotion/styled";
import {
  colors,
  dimensions,
  breakpoints,
} from "../../../../src/styles/variables";
import Pill from "../../global/pill";
import { Row } from "../../global/grid/Row";

interface IProps {
  content: ParagraphItem[];
}

const StyledPillWrapper = styled.div``;

const StyledParagraphFirst = styled.p`
  font-weight: 500;
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  line-height: 1.35;
  text-indent: 100px;
  letter-spacing: 2px;

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.textSizes.normal.mobile)};
    text-indent: 60px;
    letter-spacing: 1px;
  }
`;

const StyledParagraphSecond = styled.p`
  font-weight: 500;
  line-height: 1.1;
  text-indent: 100px;
  letter-spacing: 2px;

  @media (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.textSizes.large.mobile)}!important;
    text-indent: 60px;
    letter-spacing: 1px;
  }
`;

export function ContentParagraph({ content }: IProps) {
  return (
    <Row>
      {content.map((paragraph, index) => {
        if (paragraph.title)
          return (
            <Col start={1} span={4} key={`title-${index}`}>
              <StyledPillWrapper>
                <Pill pillText={paragraph.title} />
              </StyledPillWrapper>
            </Col>
          );
        if (paragraph.paragraph)
          return (
            <Col start={5} span={8} key={`firstParagraph-${index}`}>
              <StyledParagraphFirst>{paragraph.paragraph}</StyledParagraphFirst>
            </Col>
          );
        if (paragraph.largeParagraph)
          return (
            <Col start={5} span={8} key={`secondParagraph-${index}`}>
              <StyledParagraphSecond style={{ fontSize: 64 }}>
                {paragraph.largeParagraph}
              </StyledParagraphSecond>
            </Col>
          );
      })}
    </Row>
  );
}
