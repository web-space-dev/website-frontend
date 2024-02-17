import styled from "@emotion/styled";
import { Pill as IPill, WhatWeDo } from "../../interfaces/home";
import { colors, dimensions } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import { GridContainer } from "../global/grid/GridContainer";
import Pill from "../global/pill";
import { useState } from "react";
import { css } from "@emotion/react";

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
`;

const StyledProcessItem = styled.li``;

interface IStyledProcessItemExpand {
  isExpanded: boolean;
}

const StyledProcessItemExpand = styled.div<IStyledProcessItemExpand>`
  margin: 60px 0 40px 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      max-height: 500px; // adjust this value as needed
    `}
`;

interface IProcessItem {
  title: string;
  pills: IPill[];
}

const ProcessItem = ({ title, pills }: IProcessItem) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledProcessItem
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <StyledProcessListTitle>{title}</StyledProcessListTitle>
      {isHovered && (
        <StyledProcessItemExpand isExpanded={isHovered}>
          {pills.map((pill, index) => (
            <Pill key={`${pill.pillText}-${index}`} pillText={pill.pillText} />
          ))}
        </StyledProcessItemExpand>
      )}
    </StyledProcessItem>
  );
};

interface IWhatWeDo {
  items: WhatWeDo[];
}

export default function WhatWeDo({ items }: IWhatWeDo) {
  return (
    <StyledWrapper>
      <StyledTitle>What we do.</StyledTitle>
      <StyledProcessList>
        {items.map((item, index) => (
          <ProcessItem key={index} title={item.title} pills={item.pills} />
        ))}
      </StyledProcessList>
    </StyledWrapper>
  );
}
