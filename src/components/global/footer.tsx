import { EXAMPLE_PATH } from "../../lib/constants";
import styled from "@emotion/styled";
import { GridContainer } from "../global/grid/gridContainer";
import Pill from "../global/pill";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { IconButton } from "../global/iconButton";
import chatIcon from "../../../public/svg/icon-chat.svg";
import Link from "next/link";
import Image from "next/image";
import { getRemSize } from "../../styles/globalCss";
import eoanPicture from "../../../public/eoan-picture.png"; // replace with actual path to Eoan's picture

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const StyledWrapper = styled(GridContainer)`
  margin: 140px 0;
`;

const StyledContent = styled.div`
  grid-column: 3 / span 10;
  padding: 0;
  margin: 0;
`;

const StyledSpan = styled.span`
  font-size: ${getRemSize(dimensions.headingSizes.large.desktop)};
  margin: 0;
  display: flex;
  align-items: center;
`;

const StyledParagraphWrapper = styled.p`
  position: relative;
  overflow: hidden;
  padding: 0;
  // margin: auto;
  box-sizing: border-box;
  @media all and (max-width: ${breakpoints.md}px) {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  @media all and (max-width: ${breakpoints.sm}px) {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
`;
const StyledParagraphText = styled.span`
  font-weight: 430;
  line-height: 44px;
  font-size: ${getRemSize(dimensions.textSizes.large.desktop)};
  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.textSizes.large.mobile)};
    margin-top: 1rem;
  }
  @media all and (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
    line-height: 34px;
  }
`;

const StyledImage = styled(Image)`
  width: 30px;
  height: 30px;
  margin: 0 0.5em;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <StyledWrapper>
        <StyledContent>
          <StyledParagraphWrapper>
            <StyledParagraphText>
              <Pill pillText={"Interested?"} />
              Get in contact, have a <br />chat with Eoan
              <StyledImage src={eoanPicture} alt="Eoan" style={{width: getRemSize(dimensions.textSizes.large.desktop), height: getRemSize(dimensions.textSizes.large.desktop)}} />
              or chat
              <StyledImage src={chatIcon} alt={"chatIcon"} /> <br />
              with us
            </StyledParagraphText>
          </StyledParagraphWrapper>
        </StyledContent>
      </StyledWrapper>
    </StyledFooter>
  );
}

// Get in contact, have a chat with Eoan
// <Image src={eoanPicture} alt="Eoan" width={"1em"} height={"1em"} />
// or chat
// <StyledSpan>
//   <Image src={chatIcon} alt="Chat" width={"1em"} height={"1em"} />
// </StyledSpan>
// with us
