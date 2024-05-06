import styled from "@emotion/styled";
import { colors, dimensions, breakpoints } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";

interface IPill {
  pillText: string;
}

const StyledPill = styled.span`
  background-color: ${colors.white};
  color: ${colors.accent};
  padding: 8px 22px;
  font-size: ${getRemSize(dimensions.headingSizes.small.desktop)};
  border-radius: 50px;
  font-weight: 700;
  letter-spacing: 2.5px;
  display: inline-block;
  margin-right: 20px;
  text-align: center;
  letter-spacing: 1.5px;
  @media (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(dimensions.textSizes.small.desktop)};
  }
`;

export default function Pill({ pillText }: IPill) {
  return <StyledPill>{pillText}</StyledPill>;
}
