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
import { motion } from "framer-motion";

interface IProps {
  content: DynamicTextAndImage[];
}

const StyledBigWrapper = styled.div`
  position: relative;
`;

const StyledPillWrapper = styled.div``;

const StyledWrapper = styled.div``;

const StyledImageWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 8px;
  & img {
    border-radius: 26px;
    object-fit: cover;
    width: 162px;
    height: 343px;
  }
`;
const StyledImage = styled(motion(Image))`
  border-radius: 26px;
  object-fit: cover;
  width: 375px;
  height: 774px;
  position: absolute;
  @media (min-width: 1350px) {
    top: 92px;
    left: 310px;
  }

  @media (min-width: 1088px) and (max-width: 1350px) {
    top: 92px;
    left: 186px;
  }

  @media (max-width: 1088px) {
    top: 92px;
    left: 116px;
  }
`;

const StyledParagraphImage = styled.span`
  color: ${colors.accent};
  transition: color 0.2s;

  &:hover {
    color: ${colors.white};
  }
  & > span {
    text-decoration: underline;
  }
`;
const StyledParagraph = styled.p`
  font-size: ${getRemSize(dimensions.textSizes.large.desktop)};
  line-height: 1.2;
  letter-spacing: 2px;
  font-weight: 500;
`;
export default function DynamicTextAndImages({ content }: IProps) {
  const isDesktop = useIsDesktop();
  const [hoverIndex, setHoverIndex] = useState(null);
  const onHover = (index) => {
    setHoverIndex(index);
  };

  const onHoverOver = () => {
    setHoverIndex(null);
  };
  return (
    <StyledBigWrapper>
      <Row>
        {isDesktop ? (
          <>
            <Col start={1} span={4}>
              <StyledPillWrapper>
                <Pill pillText="The Challenge" />
              </StyledPillWrapper>
            </Col>
            <Col start={5} span={8}>
              <StyledWrapper>
                <StyledParagraph>
                  {content.map((item, index) => {
                    return item?.image ? (
                      <StyledParagraphImage
                        onMouseEnter={(e) => onHover(index)}
                        onMouseLeave={(e) => onHoverOver()}
                      >
                        {" "}
                        <span>{item.text}</span>
                      </StyledParagraphImage>
                    ) : (
                      <>{item.text}</>
                    );
                  })}
                </StyledParagraph>
                {hoverIndex && (
                  <StyledImage
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                    width={375}
                    height={774}
                    alt={`Gallery Image ${hoverIndex}`}
                    loader={() => content[hoverIndex].image.node.sourceUrl}
                    src={content[hoverIndex].image.node.sourceUrl}
                  />
                )}
              </StyledWrapper>
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
              <StyledWrapper>
                {content.map((item, index) => {
                  return (
                    <>
                      <StyledParagraph>{item.text}</StyledParagraph>
                      {item.image && item.image.node && (
                        <StyledImageWrapper>
                          <Image
                            key={index}
                            width={162}
                            height={343}
                            alt={`Gallery Image ${index}`}
                            loader={() => item.image.node.sourceUrl}
                            src={item.image.node.sourceUrl}
                          />
                        </StyledImageWrapper>
                      )}
                    </>
                  );
                })}
              </StyledWrapper>
            </Col>
          </>
        )}
      </Row>
    </StyledBigWrapper>
  );
}
