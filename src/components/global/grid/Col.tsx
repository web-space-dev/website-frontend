import styled from "@emotion/styled";

interface ColProps {
  span: number;
  cssClass?: string;
  children: React.ReactNode;
}

const StyledCol = styled.div<ColProps>`
  grid-column: span ${(props: ColProps) => props.span};
  ${({ cssClass = "" }) => cssClass}
`;

export const Col: React.FC<ColProps> = ({ children, ...props }) => {
  return <StyledCol {...props}>{children}</StyledCol>;
};
