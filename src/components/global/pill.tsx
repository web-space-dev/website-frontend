import styled from "@emotion/styled";
import { colors } from "../../styles/variables";

interface IPill {
  pillText: string;
}

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

export default function Pill({ pillText }: IPill) {
  return <StyledPill>{pillText}</StyledPill>;
}
