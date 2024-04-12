import styled from "@emotion/styled";
import { breakpoints } from "../../../styles/variables";

interface ColProps {
  start?: number;
  span: number;

  cssClass?: string;
  children: React.ReactNode;
}

const StyledCol = styled.div<ColProps>`
  grid-column: ${(props: ColProps) =>
      `${
        props.start
          ? `${props.start} / span ${props.span}`
          : `span ${props.span}`
      }`}
    ${({ cssClass = "" }) => cssClass};
  @media all and (max-width: ${breakpoints.md}px) {
    grid-column: span ${(props: ColProps) => props.span};
  }
`;

export const Col: React.FC<ColProps> = ({ children, ...props }) => {
  return <StyledCol {...props}>{children}</StyledCol>;
};
