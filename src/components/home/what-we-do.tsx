import styled from "@emotion/styled";
import { Pill as IPill, WhatWeDo } from "../../interfaces/home";
import { colors, dimensions } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import { GridContainer } from "../global/grid/GridContainer";
import Pill from "../global/pill";
import { useState } from "react";
import { css } from "@emotion/react";
import { is } from "date-fns/locale";

const StyledWrapper = styled(GridContainer)`
  margin-top: 280px;
  /* display: flex; */
  /* align-items: center; */
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
  ${({ isGlassy }: { isGlassy: boolean }) =>
    isGlassy &&
    css`
      color: red;
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
      max-height: 500px; // adjust this value as needed
      opacity: 1;
    `}
`;

interface IProcessItem {
  title: string;
  pills: IPill[];
  index: number;
  hoveredItem: number | null;
  setHoveredItem: (index: number) => void;
}

const ProcessItem = ({
  title,
  pills,
  hoveredItem,
  setHoveredItem,
  index,
}: IProcessItem) => {
  const [isHovered, setIsHovered] = useState(false);

  const setHovering = () => {
    setIsHovered(true);
    setHoveredItem(index);
  };

  return (
    <StyledProcessItem
      onMouseEnter={() => setHovering()}
      onMouseLeave={() => setIsHovered(false)}
    >
      <StyledProcessListTitle isGlassy={hoveredItem !== null}>
        {title}
      </StyledProcessListTitle>
      {/* {isHovered && ( */}
      <StyledProcessItemExpand isExpanded={isHovered}>
        {pills.map((pill, index) => (
          <Pill key={`${pill.pillText}-${index}`} pillText={pill.pillText} />
        ))}
      </StyledProcessItemExpand>
      {/* )} */}
    </StyledProcessItem>
  );
};

interface IWhatWeDo {
  items: WhatWeDo[];
}

export default function WhatWeDo({ items }: IWhatWeDo) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

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
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />
        ))}
      </StyledProcessList>
    </StyledWrapper>
  );
}
