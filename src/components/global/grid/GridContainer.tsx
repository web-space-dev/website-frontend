import styled from "@emotion/styled";
import { breakpoints, dimensions } from "../../../styles/variables";

interface Props {
  cssClass?: string;
}

export const GridContainer = styled.section<Props>`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px; // adjust gap as needed
  margin-left: auto;
  margin-right: auto;
  max-width: ${breakpoints.lg}px;
  padding: 0 ${dimensions.gridContainerPadding}px;
  width: 100%;

  @media all and (max-width: ${breakpoints.md}px) {
    padding: 0 ${dimensions.gridContainerMobileTabletPadding}px;
  }

  ${({ cssClass = "" }) => cssClass}
`;
