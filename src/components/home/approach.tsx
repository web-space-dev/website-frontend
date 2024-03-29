import React, { useEffect, useRef, useState } from "react";
import { Approach } from "../../interfaces/home";
import styled from "@emotion/styled";
import { breakpoints, colors, dimensions } from "../../styles/variables";
import { GridContainer } from "../global/grid/gridContainer";
import Pill from "../global/pill";
import { motion } from "framer-motion";
import { IconButton } from "../global/iconButton";
import ArrowUpRight from "../../icons/arrowUpRight";
import Link from "next/link";
import { getRemSize } from "../../styles/globalCss";
import useIsIntersecting from "../../hooks/useIsIntersecting";

interface IApproach {
  items: Approach[];
}

const StyledWrapper = styled(GridContainer)`
  // height: 100vh;
  align-items: center;
  position: relative;
`;

const StyledHeading2 = styled.h2`
  font-weight: 521;
  font-size: ${getRemSize(dimensions.headingSizes.medium.desktop)};
  grid-column: 1 / span 12;
  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(dimensions.headingSizes.medium.mobile)};
  }
`;

const StyledBoxWrapper = styled.div`
  position: relative;
`;
interface IStyledApproachBorder {
  isVisible: boolean;
}

const StyledApproachBorderLeft = styled.div<IStyledApproachBorder>`
  height: 250px;
  background: linear-gradient(to left, rgba(255, 255, 255, 0), ${colors.white});
  position: absolute;
  width: 12px;
  left: 0;
  top: 0;
  transition: 0.2s ease;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
`;
const StyledApproachBorderRight = styled.div<IStyledApproachBorder>`
  height: 250px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    ${colors.white}
  );
  position: absolute;
  width: 12px;
  right: 0;
  top: 0;
  transition: 0.2s ease;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
`;

const StyledBox = styled(motion.div)`
  /* grid-column: 1 / span 12; */
  padding-left: 20px;
  display: flex;
  width: 100%;
  height: 250px;
  border: 0px 0px 5px 0px;
  // padding: 40px 0px 40px 0px;
  overflow-x: auto;
  scrollbar-width: none;
  position: relative;
  overflow: overflow;
  @media all and (max-width: ${breakpoints.md}px) {
    height: auto;
    flex-direction: column;
    overflow-x: visible;
  }
`;

const StyledCard = styled.div`
  margin-right: 200px;
  margin-bottom: 10px;
  width: 580px;
  min-width: 470px;
  height: 251px;
  border-radius: 20px;
  padding: 30px 28px 30px 28px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  overflow: hidden;
  scrollbar-width: none;

  @media all and (max-width: ${breakpoints.md}px) {
    width: 100%;
  }
`;

const StyledParagraphWrapper = styled.p`
  position: relative;
`;
const StyledParagraphText = styled.span`
  font-weight: 430;
  line-height: 45px;
  font-size: 46px;
  letter-spacing: 2px;
  text-indent: 20px;
  // position: relative;
`;
const StyledCardPill = styled(motion.div)`
  margin-right: 200px;
  width: 580px;
  min-width: 470px;
  height: 251px;
  border-radius: 20px;
  padding: 30px 20px 30px 30px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0 0 auto;
  scrollbar-width: none;
  overflow: auto;
  box-sizing: border-box;

  @media all and (max-width: ${breakpoints.md}px) {
    display: none;
  }
`;

const StyledPillWrapper = styled.span`
  position: absolute;
  top: 3px;
  left: 4px;
`;

const StyledTextSpacer = styled.span`
  padding: 0 35px;
  visibility: hidden;
`;

const SmallerIconButton = styled.div`
  width: 3rem;
  height: 3rem;
  margin-right: 10px;
  & > * {
    width: 100%;
    height: 100%;
    transform: scale(0.7);
  }
  @media all and (max-width: ${breakpoints.md}px) {
  }
`;
const StyledPillButton = styled(motion.div)`
  display: none;

  @media all and (max-width: ${breakpoints.md}px) {
    width: 47%;
    min-width: 237px;
    margin-left: auto;
    margin-right: auto;
    background-color: ${colors.white};
    color: ${colors.black};
    border-radius: 26px;
    padding: 3vw;
    font-size: 4vw;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    position: relative;
  }
  @media all and (max-width: ${breakpoints.sm}px) {
    padding: 3vw;
    font-size: 5vw;
  }
`;
const StyledIcon = styled(ArrowUpRight)`
  width: 30px;
  height: 30px;
  margin-left: -2px;
  position: absolute;
  top: 25%;
  right: 6%;

  transition: 0.3s ease;

  &:hover {
    transform: rotate(45deg);
  }

  @media all and (max-width: ${breakpoints.md}px) {
    top: 38%; /* adjust top for medium screens */
    right: 6%; /* adjust right for medium screens */
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    top: 29%; /* adjust top for small screens */
    right: 6%; /* adjust right for small screens */
  }
`;

export default function Approach({ items }: IApproach) {
  const boxRef = useRef(null);
  const borderLeftRef = useRef();
  const borderRightRef = useRef();

  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, items.length + 1);
  }, [items]);

  const isLeftIntersecting = useIsIntersecting(borderLeftRef, cardsRef, boxRef);
  const isRightIntersecting = useIsIntersecting(
    borderRightRef,
    cardsRef,
    boxRef
  );

  return (
    <>
      <StyledWrapper>
        <StyledHeading2>Our approach</StyledHeading2>
      </StyledWrapper>
      <StyledBoxWrapper>
        <StyledApproachBorderLeft
          ref={borderLeftRef}
          isVisible={isLeftIntersecting}
        />
        <StyledBox ref={boxRef}>
          {items.map((item, index) => (
            <StyledCard
              key={index}
              ref={(el) => (cardsRef.current[index + 1] = el)}
            >
              <StyledParagraphWrapper>
                <StyledTextSpacer>{item.title}</StyledTextSpacer>
                <StyledPillWrapper>
                  <Pill pillText={item.title} />
                </StyledPillWrapper>
                <StyledParagraphText>{item.paragraph}</StyledParagraphText>
              </StyledParagraphWrapper>
            </StyledCard>
          ))}
          <StyledCardPill ref={(el) => (cardsRef.current[0] = el)}>
            <StyledParagraphWrapper>
              <StyledParagraphText>
                Check out <br /> our work
              </StyledParagraphText>
            </StyledParagraphWrapper>
            <SmallerIconButton>
              <Link href="/projects">
                <IconButton />
              </Link>
            </SmallerIconButton>
          </StyledCardPill>
          <StyledPillButton>
            {" "}
            Check out more{" "}
            <Link href="/projects">
              <StyledIcon />
            </Link>{" "}
          </StyledPillButton>
        </StyledBox>
        <StyledApproachBorderRight
          ref={borderRightRef}
          isVisible={isRightIntersecting}
        />
      </StyledBoxWrapper>
    </>
  );
}
