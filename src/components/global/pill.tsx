import styled from "@emotion/styled";
import { colors } from "../../styles/variables";

interface IPill {
  pillText: string;
}

const StyledPill = styled.span`
  background-color: ${colors.white};
  color: ${colors.accent};
  padding: 12px 14px 7px 14px;
  font-size: 17px;
  border-radius: 50px;
  font-weight: 700;
  letter-spacing: 2px;
  display: inline-block;
  margin-right: 20px;
  height: 51px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  text-align: center;
`;

export default function Pill({ pillText }: IPill) {
  return <StyledPill>{pillText}</StyledPill>;
}
