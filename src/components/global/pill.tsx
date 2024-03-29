import styled from "@emotion/styled";
import { colors } from "../../styles/variables";

interface IPill {
  pillText: string;
}

const StyledPill = styled.span`
background-color: ${colors.white};
color: ${colors.accent};
padding: 9px 21px 9px 21px;
font-size: 14px;
border-radius: 50px;
font-weight: 700;
letter-spacing: 3px;
display: inline-block;
margin-right: 20px;
text-align: center;
  // height: 38px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
`;

export default function Pill({ pillText }: IPill) {
  return <StyledPill>{pillText}</StyledPill>;
}
