import styled from "@emotion/styled";
import { Pill as IPill, WhatWeDo } from "../../interfaces/home";
import { dimensions } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import { GridContainer } from "../global/grid/GridContainer";
import Pill from "../global/pill";
import { useState } from "react";
import { css } from "@emotion/react";

const StyledWrapper = styled(GridContainer)`
  margin: 140px 0;
`;

const StyledTitle = styled.h2`
  font-size: ${getRemSize(dimensions.headingSizes.h5)};
  font-weight: 400;
  grid-column: 1 / span 2;
`;

const StyledProcessList = styled.ul`
  grid-column: 3 / span 10;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledProcessListTitle = styled.h3`
  margin-top: 0;
  font-size: ${getRemSize(dimensions.headingSizes.medium)};
  transition: 0.3s ease-in-out;
  ${({ isGlassy }: { isGlassy: boolean }) =>
    isGlassy &&
    css`
      filter: blur(4px);
    `}
`;

const StyledProcessItem = styled.li``;

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
    <StyledProcessItem
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <StyledProcessListTitle isGlassy={isGlassy()}>
        {title}
      </StyledProcessListTitle>
      <StyledProcessItemExpand isExpanded={hoverItems[index]}>
        {pills.map((pill, index) => (
          <Pill key={`${pill.pillText}-${index}`} pillText={pill.pillText} />
        ))}
      </StyledProcessItemExpand>
    </StyledProcessItem>
  );
};

interface IWhatWeDo {
  items: WhatWeDo[];
}

export default function WhatWeDo({ items }: IWhatWeDo) {
  const [hoverItems, setHoverItems] = useState(
    new Array(items.length).fill(false)
  );

  return (
    <StyledWrapper>
      <StyledTitle>What we do.</StyledTitle>
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
    </StyledWrapper>
  );
}
