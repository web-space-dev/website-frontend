import styled from "@emotion/styled";

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
`;

export const Col: React.FC<ColProps> = ({ children, ...props }) => {
  return <StyledCol {...props}>{children}</StyledCol>;
};
