import Image from "next/image";
import { DynamicTextAndImage } from "../../../interfaces/project";
import { Row } from "../../global/grid/Row";
import { Col } from "../../global/grid/Col";
import Pill from "../../global/pill";
import styled from "@emotion/styled";
import { useState } from "react";
import { dimensions, breakpoints, colors } from "../../../styles/variables";
import { getRemSize } from "../../../styles/globalCss";
import useIsDesktop from "../../../hooks/useIsDesktop";

interface IProps {
  content: DynamicTextAndImage[];
}
const StyledPillWrapper = styled.div``;

const StyledAnimationWrapper = styled.div`
  position: relative;
`;

const StyledImageWrapper = styled.div`
  & img {
    position: absolute;
    bottom: 165px;
    right: 874px;
    width: 375px;
    height: 774px;
  }
`;

const StyledParagraphImage = styled.p``;

const StyledParagraph = styled.p`
  font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
  line-height: 1.2;
  letter-spacing: 2px;
  font-weight: 500;
`;

export default function DynamicTextAndImages({ content }: IProps) {
  const isDesktop = useIsDesktop();
  const [hoverIndex, setHoverIndex] = useState(null);
  const onHover = (index) => {
    setHoverIndex(index);
    console.log("hovered");
  };

  const onHoverOver = () => {
    setHoverIndex(null);
  };
  return (
    <Row>
      {isDesktop ? (
        <>
          <Col start={1} span={4}>
            <StyledPillWrapper>
              <Pill pillText="The Challenge" />
            </StyledPillWrapper>
          </Col>
          <Col start={5} span={8}>
            <StyledAnimationWrapper>
              {content.map((item, index) => {
                return item?.image ? (
                  // <div
                  //   onMouseEnter={(e) => onHover(index)}
                  //   onMouseLeave={(e) => onHoverOver()}
                  // >
                  <>
                    <StyledParagraphImage>{item.text}</StyledParagraphImage>
                    {/* // {hoverIndex === index && ( */}
                    <StyledImageWrapper>
                      <Image
                        key={index}
                        width={375}
                        height={774}
                        alt={`Gallery Image ${index}`}
                        loader={() => item.image.node.sourceUrl}
                        src={item.image.node.sourceUrl}
                      />
                    </StyledImageWrapper>
                    {/* // )} */}
                    {/* </div> */}
                  </>
                ) : (
                  <StyledParagraph>{item.text}</StyledParagraph>
                );
              })}
            </StyledAnimationWrapper>
          </Col>
        </>
      ) : (
        <>
          <Col start={1} span={12}>
            <StyledPillWrapper>
              <Pill pillText="The Challenge" />
            </StyledPillWrapper>
          </Col>
          <Col start={1} span={12}>
            {content.map((item) => {
              return (
                <>
                  <StyledParagraph>{item.text}</StyledParagraph>
                  <StyledImageWrapper>
                    <Image
                      width={375}
                      height={774}
                      alt={`Gallery Image`}
                      loader={() => item.image.node.sourceUrl}
                      src={item.image.node.sourceUrl}
                    />
                  </StyledImageWrapper>
                </>
              );
            })}
          </Col>
        </>
      )}
    </Row>
  );
}
