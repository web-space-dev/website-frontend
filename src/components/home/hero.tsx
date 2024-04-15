import styled from "@emotion/styled";
import { colors } from "../../styles/variables";
import { GridContainer } from "../global/grid/gridContainer";
import Image from "next/image";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";

const StyledWrapper = styled(GridContainer)`
  height: 100vh;
  align-items: center;
`;

const Background = styled.span`
  background-color: ${colors.white};
  width: 100%;
  height: 100vh;
`;

const StyledRow = styled(Row)`
  height: 100vh;
  align-items: center;
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
        <StyledRow>
          <Col start={2} span={10}>
            <StyledHeading>
              <StyledImage
                src={"/logo-icon.png"}
                alt="WebSpace Icon"
                width="33"
                height="40"
              />
              {title}
            </StyledHeading>
          </Col>
        </StyledRow>
      </StyledWrapper>
    </Background>
  );
}
