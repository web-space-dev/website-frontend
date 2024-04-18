import styled from "@emotion/styled";
import { Pill as IPill, WhatWeDo as IWhatWeDo } from "../../interfaces/home";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import { GridContainer } from "../global/grid/gridContainer";
import Pill from "../global/pill";
import { useState } from "react";
import { css } from "@emotion/react";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";

const StyledWrapper = styled(GridContainer)`
  margin: 140px 0;
`;

const StyledTitle = styled.h2`
  font-size: ${getRemSize(dimensions.headingSizes.small.desktop)};
  font-weight: 400;
  @media all and (max-width: ${breakpoints.md}px) {
    grid-column: 1 / span 12;
  }
`;

const StyledProcessList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledProcessListTitle = styled.h3`
  margin-top: 0;
  font-size: ${getRemSize(dimensions.headingSizes.large.desktop)};
  transition: 0.3s ease-in-out;
  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.large.mobile)};
  }
  ${({ isGlassy }: { isGlassy: boolean }) =>
    isGlassy &&
    css`
      filter: blur(4px);
    `}
`;

interface IStyledProcessItemExpand {
  isExpanded: boolean;
}

const StyledProcessItemExpand = styled.div<IStyledProcessItemExpand>`
  margin: 0;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: 0.3s ease-in-out;

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      margin: 60px 0 40px 0;
      max-height: 500px;
      opacity: 1;
    `}
`;

const StyledPill = styled.span`
  background-color: ${colors.white};
  color: ${colors.black};
  padding: 10px 30px;
  margin: 0 16px;
  border-radius: 50px;
  font-weight: 500;
  letter-spacing: 1px;
  display: inline-block;
`;

interface IProcessItem {
  title: string;
  pills: IPill[];
  index: number;
  hoverItems: boolean[];
  setHoverItems: (items: boolean[]) => void;
}

const ProcessItem = ({
  title,
  pills,
  hoverItems,
  setHoverItems,
  index,
}: IProcessItem) => {
  const setHovering = (option: boolean) => {
    const newHoverItems = hoverItems;
    newHoverItems[index] = option;

    setHoverItems([...newHoverItems]);
  };

  const isGlassy = () => {
    return !hoverItems[index] && hoverItems.some((item) => item);
  };

  return (
    <li
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <StyledProcessListTitle isGlassy={isGlassy()}>
        {title}
      </StyledProcessListTitle>
      <StyledProcessItemExpand isExpanded={hoverItems[index]}>
        {pills.map((pill, index) => (
          <StyledPill key={`${pill.pillText}-${index}`}>
            {pill.pillText}
          </StyledPill>
        ))}
      </StyledProcessItemExpand>
    </li>
  );
};

interface WhatWeDoProps {
  items: IWhatWeDo[];
}

export default function WhatWeDo({ items }: WhatWeDoProps) {
  const [hoverItems, setHoverItems] = useState(
    new Array(items.length).fill(false)
  );

  return (
    <StyledWrapper>
      <Row>
        <Col start={1} span={2}>
          <StyledTitle>What we do.</StyledTitle>
        </Col>
        <Col start={3} span={10}>
          <StyledProcessList>
            {items.map((item, index) => (
              <ProcessItem
                key={index}
                title={item.title}
                pills={item.pills}
                index={index}
                hoverItems={hoverItems}
                setHoverItems={setHoverItems}
              />
            ))}
          </StyledProcessList>
        </Col>
      </Row>
    </StyledWrapper>
  );
}
