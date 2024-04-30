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

const StyledWrapper = styled.div``;

const StyledImageWrapper = styled.div`
  & img {
    border-radius: 26px;
    object-fit: cover;
    position: absolute;
    width: 375px;
    height: 774px;

    @media (min-width: 1530px) and (max-width: 2560px) {
      bottom: -579px;
      right: 873px;
    }

    @media (min-width: 1421px) and (max-width: 1530px) {
      bottom: -585px;
      right: 799px;
    }
    @media (min-width: 1301px) and (max-width: 1420px) {
      bottom: -532px;
      right: 799px;
    }
    @media (min-width: 1240px) and (max-width: 1300px) {
      bottom: -538px;
      right: 734px;
    }

    @media (min-width: 1145px) and (max-width: 1240px) {
      bottom: -538px;
      right: 710px;
    }

    @media (min-width: 1050px) and (max-width: 1145px) {
      bottom: -496px;
      right: 627px;
    }

    @media (min-width: 921px) and (max-width: 1050px) {
      bottom: -489px;
      right: 487px;
    }

    @media (max-width: 920px) {
      bottom: -438px;
      right: 461px;
    }
  }
`;

const StyledParagraphImage = styled.span`
  color: ${colors.accent};
`;

const StyledParagraph = styled.p`
  font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
  line-height: 1.2;
  letter-spacing: 2px;
  font-weight: 500;
  position: relative;
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
            <StyledWrapper>
              <StyledParagraph>
                {content.map((item, index) => {
                  return item?.image ? (
                    <StyledParagraphImage
                      onMouseEnter={(e) => onHover(index)}
                      onMouseLeave={(e) => onHoverOver()}
                    >
                      {" " + item.text}
                    </StyledParagraphImage>
                  ) : (
                    <>{item.text}</>
                  );
                })}
              </StyledParagraph>
              {hoverIndex && (
                <StyledImageWrapper>
                  <Image
                    width={375}
                    height={774}
                    alt={`Gallery Image ${hoverIndex}`}
                    loader={() => content[hoverIndex].image.node.sourceUrl}
                    src={content[hoverIndex].image.node.sourceUrl}
                  />
                </StyledImageWrapper>
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
            {content.map((item, index) => {
              return (
                <StyledWrapper>
                  <StyledParagraph>{item.text}</StyledParagraph>;
                  {item.image && (
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
                  )}
                </StyledWrapper>
              );
            })}
          </Col>
        </>
      )}
    </Row>
  );
}
