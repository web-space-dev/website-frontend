import styled from "@emotion/styled";
import { breakpoints } from "../../../styles/variables";

export const Row = styled.div`
  position: relative;
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); */
  // 320 /2
  /* grid-template-columns: repeat(6, minmax(160px, 1fr)); */
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 20px;
  margin-bottom: 40px;

  @media all and (max-width: ${breakpoints.md}px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
