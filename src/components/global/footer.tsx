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
import {
  StyledParagraphWrapper,
  StyledParagraphText,
  StyledPillWrapper,
  StyledTextSpacer
} from "../../components/home/approach";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion';
// import { wrap } from "@motionone/utils";

const StyledWrapper = styled(GridContainer)`
  margin: 140px 0;
`;

const StyledContent = styled.div`
  grid-column: 3 / span 8;
  padding: 0;
  margin: 0;
`;

const StyledImage = styled(Image)`
  width: 44px;
  height: 44px;
  margin: 0 1.25rem;
  vertical-align: middle;
`;

const StyledIconButton = styled.button`
  width: 44px;
  height: 44px;
  margin: 0 1.25rem;
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

const StyledBottomFrameContainer = styled.div`
  overflow: hidden;
  letter-spacing: -2px;
  margin: 0;
  white-space: nowrap;
  flex-wrap: nowrap;
`;

const StyledBottomFrame = styled(motion.div)`
  font-weight: 682;
  font-size: 344px;
  white-space: nowrap;
  line-height: 155px;
  flex-wrap: nowrap;
  letter-spacing: 0.06em;
  text-align: center;
`;

const ScrollingText = styled.span`
  display: inline-block;
  margin-right: 40px;
`;

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function wrap(min: number, max: number, value: number) {
  const rangeSize = max - min;
  return ((((value - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [-30, 60], [0, 5], {
    clamp: false
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-100, 10, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <StyledBottomFrameContainer>
      <StyledBottomFrame style={{ x }}>
        {Array(4).fill(null).map((_, i) => (
          <ScrollingText key={i}>{children}</ScrollingText>
        ))}
      </StyledBottomFrame>
    </StyledBottomFrameContainer>
  );
}

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
      <ParallaxText baseVelocity={-12}>WEBSPACE</ParallaxText>
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
