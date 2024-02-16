import styled from "@emotion/styled";
import { colors } from "../../styles/variables";
import { GridContainer } from "../global/grid/GridContainer";
import Image from "next/image";

const StyledWrapper = styled(GridContainer)`
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Background = styled.span`
  background-color: ${colors.white};
  width: 100%;
  height: 100vh;
`;

const StyledHeading = styled.h1`
  color: ${colors.black};
  font-weight: 600;
`;

const StyledImage = styled(Image)`
  margin-right: 65px;
  margin-bottom: -5px;
`;

export default function Hero({ title }) {
  return (
    <Background>
      <StyledWrapper>
        <StyledHeading>
          <StyledImage
            src={`/Logo-icon.png`}
            alt="WebSpace Icon"
            width="33"
            height="40"
          />
          {title}
        </StyledHeading>
      </StyledWrapper>
    </Background>
  );
}
