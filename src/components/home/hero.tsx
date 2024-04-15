import styled from "@emotion/styled";
import { colors, breakpoints, dimensions } from "../../styles/variables";
import { GridContainer } from "../global/grid/gridContainer";
import Image from "next/image";
import useIsDesktop from "../../hooks/useIsDesktop";

const StyledWrapper = styled(GridContainer)`
  height: 100vh;
  align-items: center;
`;

const Background = styled.span`
  background-color: ${colors.white};
  width: 100%;
  height: 100vh;
`;

const StyledHeading = styled.h1`
  grid-column: 2 / span 10;
  color: ${colors.black};
  font-weight: 600;

  @media all and (max-width: ${breakpoints.md}px) {
    text-indent: 60px;
  }
`;

const StyledImage = styled(Image)`
  margin-right: 65px;
  margin-bottom: -5px;
`;

export default function Hero({ title }) {
  const isDesktop = useIsDesktop();

  return (
    <Background>
      <StyledWrapper>
        <StyledHeading>
          {isDesktop && (
            <StyledImage
              src={"/logo-icon.png"}
              alt="WebSpace Icon"
              width="33"
              height="40"
            />
          )}
          {title}
        </StyledHeading>
      </StyledWrapper>
    </Background>
  );
}
