import { Approach } from "../../interfaces/home";
import styled from "@emotion/styled";
import { colors } from "../../styles/variables";
import { GridContainer } from "../global/grid/GridContainer";
import Pill from "../global/pill";

interface IApproach {
  items: Approach[];
}

const StyledWrapper = styled(GridContainer)`
  height: 100vh;
  align-items: center;
`;

const StyledHeading2 = styled.h2`
  font-weight: 521;
  grid-column: 1 / span 12;
  `;
const StyledBox = styled.div`
  grid-column: 1 / span 12;
  // display: flex;
  width: 100%;
  height: 411px;
  border: 1px 0px 1px 0px;
  // padding: 40px 0px 40px 0px;
`;
const StyledCard = styled.div`
  margin-top: 10px;
  width: 462px;
  height: 251px;
  border-radius: 20px;
  padding: 40px 20px 40px 20px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
`;
const StyledParagraph = styled.span`
  font-size: 40px;
  font-weight: 430;
  line-height: 45px;
`;
export default function Approach({ items }: IApproach) {
  return (

    <StyledWrapper>
      <StyledHeading2>Our approach</StyledHeading2>
      <StyledBox>
        {items.map((item, index) => {
          return (
            <StyledCard key={index}>
              <p><Pill pillText={item.title}/>
                <StyledParagraph>{item.paragraph}</StyledParagraph></p>
            </StyledCard>
          );
        })}
      </StyledBox>
    </StyledWrapper>
  );
}
