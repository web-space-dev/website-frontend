import { EXAMPLE_PATH } from "../../lib/constants";
import styled from "@emotion/styled";
import { GridContainer } from "../global/grid/gridContainer";
import Pill from "../global/pill";
import { breakpoints, colors } from "../../styles/variables";
import chatIcon from "../../../public/svg/icon-chat.svg";
import Image from "next/image";
import Link from "next/link";
import { getRemSize } from "../../styles/globalCss";
import eoanPicture from "../../../public/eoan-picture.png";
import {
  StyledParagraphWrapper,
  StyledParagraphText,
  StyledPillWrapper,
  StyledTextSpacer
} from "../../components/home/approach";

const StyledWrapper = styled(GridContainer)`
  margin: 140px 0;
`;

const StyledContent = styled.div`
  grid-column: 3 / span 8;
  padding: 0;
  margin: 0;

  @media all and (max-width: ${breakpoints.md}px) {
    grid-column: 1 / span 12;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    grid-column: 1 / span 12;
  }
`;

const StyledImage = styled(Image)`
  width: 44px;
  height: 44px;
  margin-left: 0.7rem;
  vertical-align: middle;

  @media all and (max-width: ${breakpoints.sm}px) {
    display: none;
  }
`;

const StyledIconButton = styled.button`
  width: 44px;
  height: 44px;
  margin: 0.7rem;
  padding: 0;
  border: 2px solid ${colors.blackLight};
  transition: 0.3s ease;
  border-radius: 0.75rem;
  vertical-align: middle;

  &:hover {
    background-color: ${colors.accent};
    border-color: ${colors.accent};
  }
`;

const StyledLinkWrapper = styled.div`
  display: flex;
  height: 9px;
  color: #F8F8F8;
  font-weight: 400;
  opacity: 0.5;
  margin-bottom: 1.5rem;
  justify-content: end;

  & > a {
    margin-right: 1.5rem;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    justify-content: center;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    justify-content: center;
  }
`;

const StyledSlider = styled.div`
  height: 155px;
  margin: auto;
  width: 100%;
  display: grid;
  place-items: center;
  overflow: hidden;

  @media all and (max-width: ${breakpoints.md}px) {
    height: 120px;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    height: 70px;
  }
`;

const StyledSlideTrack = styled.div`
  display: flex;
  width: calc(1725px * 4); // total width of all slides
  animation: scroll 8s linear infinite;

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-1725px);
    }
  }

  @media all and (max-width: ${breakpoints.md}px) {
    width: calc(1200px * 4);
    animation: scroll 6s linear infinite;

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-1200px);
      }
    }
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    width: calc(800px * 4);
    animation: scroll 4s linear infinite;

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-600px);
      }
    }
  }
`;

const StyledSlide = styled.div`
  width: 1725px;
  display: flex;
  align-items: start;

  @media all and (max-width: ${breakpoints.md}px) {
    width: 1000px;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    width: 600px;
  }
`;

const StyledSlideText = styled.span`
  font-weight: 600;
  font-size: 344px;
  letter-spacing: 0.6rem;
  width: 100%;
  line-height: 72px;
  text-shadow: 9px 0px #39979C;

  @media all and (max-width: ${breakpoints.md}px) {
    font-size: 185px;
    line-height: 40px;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    font-size: 103px;
    line-height: 21.6px;
    text-shadow: none;
  }
`;

export default function Footer() {
  return (
    <footer>
      <StyledWrapper>
        <StyledContent>
          <StyledParagraphWrapper>
            <StyledTextSpacer>{"Interested?"}</StyledTextSpacer>
            <StyledPillWrapper>
              <Pill pillText={"Interested?"} />
            </StyledPillWrapper>
            <StyledParagraphText>
              Get in contact, have a chat with Eoan{<StyledImage src={eoanPicture} alt="Eoan" />} or chat
              {<Link href="/contact">
                <StyledIconButton>
                  <Image src={chatIcon} alt="Chat" />
                </StyledIconButton>
              </Link>}
              with us
            </StyledParagraphText>
          </StyledParagraphWrapper>
        </StyledContent>
      </StyledWrapper>
      <StyledLinkWrapper>
        <Link href="#">Legal Information</Link>
        <Link href="#">@WebSpace 2021</Link>
      </StyledLinkWrapper>
      <StyledSlider>
        <StyledSlideTrack>
          <StyledSlide>
            <StyledSlideText>WEBSPACE</StyledSlideText>
          </StyledSlide>
          <StyledSlide>
            <StyledSlideText>WEBSPACE</StyledSlideText>
          </StyledSlide>
          <StyledSlide>
            <StyledSlideText>WEBSPACE</StyledSlideText>
          </StyledSlide>
          <StyledSlide>
            <StyledSlideText>WEBSPACE</StyledSlideText>
          </StyledSlide>
        </StyledSlideTrack>
      </StyledSlider>
    </footer>
  );
}
