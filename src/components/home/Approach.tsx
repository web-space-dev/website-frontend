import React, { useEffect, useRef, useState } from 'react';
import { Approach } from "../../interfaces/home";
import styled from "@emotion/styled";
import { colors } from "../../styles/variables";
import { GridContainer } from "../global/grid/GridContainer";
import Pill from "../global/pill";
import { motion } from "framer-motion";



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

const StyledBox = styled(motion.div)`
  grid-column: 1 / span 12;
  display: flex;
  width: 100%;
  height: 274px;
  border: 0px 0px 5px 0px;
  // padding: 40px 0px 40px 0px;
  overflow-x:  auto;
  scrollbar-width: none;
  position: relative;
  overflow: auto;
  // background:
  // /* Shadow covers */
  // linear-gradient(to right, white 30%, rgba(255, 255, 255, 0)),
  // linear-gradient(to left, white 70%, rgba(255, 255, 255, 0)) 100% 0,
  // /* Shadows */
  // radial-gradient(farthest-side at 0 50%, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)),
  // radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)) 100% 0;
  // background-repeat: no-repeat;
  // background-size: 40px 100%, 40px 100%, 14px 100%, 14px 100%;
  // /* Opera doesn't support this in the shorthand */
  // background-attachment: local, local, scroll, scroll;

  @media (max-width: 768px) {
    flex-direction: column;
    overflow-x: visible;
  }

`;

const StyledCard = styled(motion.div)`
  margin-top: 10px;
  margin-right: 200px;
  width: 462px;
  min-width: 470px;
  height: 251px;
  border-radius: 20px;
  padding: 40px 20px 40px 20px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  overflow: hidden;
  scrollbar-width: none;


  @media (max-width: 768px) {
    width: 100%;
  }
  ::before, ::after {
    content: "";
    position: absolute;
    top: 10px;
    bottom: 13px;
    width: 35px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.1), transparent);


    @media (max-width: 768px) {
      display: none;
    }
  }

  ::before {
    left: 0;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  ::after {
    right: 10px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.1), transparent);
  }
`;
const StyledParagraph = styled.span`
  font-size: 40px;
  font-weight: 430;
  line-height: 45px;
`;
export default function Approach({ items }: IApproach) {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    const handleScroll = () => {
      const shadowElement = box.querySelector(':before');
      if (shadowElement) {
        shadowElement.style.width = `${box.scrollLeft}px`;
      }
    };
    box.addEventListener('scroll', handleScroll);
    return () => box.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StyledWrapper>
      <StyledHeading2>Our approach</StyledHeading2>
      <StyledBox ref={boxRef}>
        {items.map((item, index) => (
          <StyledCard key={index}>
            <p>
              <Pill pillText={item.title} />
              <StyledParagraph>{item.paragraph}</StyledParagraph>
            </p>
          </StyledCard>
        ))}
      </StyledBox>
    </StyledWrapper>
  );
}
