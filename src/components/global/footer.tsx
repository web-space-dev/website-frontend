import { EXAMPLE_PATH } from "../../lib/constants";
import styled from "@emotion/styled";
import { GridContainer } from "../global/grid/gridContainer";
import Pill from "../global/pill";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { IconButton } from "../global/iconButton";
import chatIcon from "../../../public/svg/icon-chat.svg";
import webspaceFrame from "../../../public/svg/webspace-frame.svg";
import ChatIcon from "../../icons/chatIcon";
import Link from "next/link";
import Image from "next/image";
import { getRemSize } from "../../styles/globalCss";
import eoanPicture from "../../../public/eoan-picture.png";
import { useRef } from "react";
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';

const StyledWrapper = styled(GridContainer)`
  margin: 140px 0;
`;

const StyledContent = styled.div`
  grid-column: 3 / span 8;
  padding: 0;
  margin: 0;
`;

const StyledSpan = styled.span`
  font-size: ${getRemSize(dimensions.headingSizes.large.desktop)};
  margin: 0;
  display: flex;
  align-items: center;
`;

const StyledParagraphWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding: 0;
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
  width: 44px;
  height: 44px;
  margin: 0 1rem;
`;

const StyledIconButton = styled.button`
  /* width: 58px;
  height: 70px;
  padding: 20px 14px; */
  width: 44px;
  height: 44px;
  margin: 0 1rem;
  padding: 0;
  border: 2px solid ${colors.blackLight};
  transition: 0.3s ease;
  border-radius: 0.75rem;

  &:hover {
    background-color: ${colors.accent};
    border-color: ${colors.accent};
  }
`;

const StyledFrameImage = styled(motion.div)`
  white-space: nowrap;
`;

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function wrap(min: number, max: number, value: number) {
  const rangeSize = max - min;
  return ((((value - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    let newValue = baseX.get() + moveBy;

    // Wrap the new value
    newValue = wrap(-100, 0, newValue);

    baseX.set(newValue);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <StyledFrameImage style={{ x }}>
      <span>{children} </span>
      <span>{children} </span>
      <span>{children} </span>
      <span>{children} </span>
    </StyledFrameImage>
  );
}

export default function Footer() {
  return (
    <footer>
      <StyledWrapper>
        <StyledContent>
          <StyledParagraphWrapper>
            <StyledParagraphText>
              <Pill pillText={"Interested?"} />
              Get in contact, have a chat with Eoan
              <StyledImage src={eoanPicture} alt="Eoan" />
              or chat
              <StyledIconButton>
                <Image src={chatIcon} alt="Chat" />
              </StyledIconButton>
              with us
            </StyledParagraphText>
          </StyledParagraphWrapper>
        </StyledContent>
      </StyledWrapper>
      <ParallaxText baseVelocity={-12}>
        <Image src={webspaceFrame} alt="Frame" className="webspace-frame"/>
      </ParallaxText>
    </footer>
  );
}

// Get in contact, have a chat with Eoan
// <Image src={eoanPicture} alt="Eoan" width={"1em"} height={"1em"} />
// or chat
// <StyledSpan>
//   <Image src={chatIcon} alt="Chat" width={"1em"} height={"1em"} />
// </StyledSpan>
// with us
