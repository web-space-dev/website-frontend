import React from "react";
import styled from "@emotion/styled";
import { colors, breakpoints } from "../../styles/variables";
import ArrowUpRight from "../../icons/arrowUpRight";
import { motion } from "framer-motion";

const StyledIcon = styled.div`
  width: 30px;
  height: 30px;
  margin-left: -2px;
  position: absolute;
  top: 25%;
  right: 6%;

  transition: 0.3s ease;

  @media all and (max-width: ${breakpoints.md}px) {
    top: 35%;
    right: 6%;
  }

  @media all and (max-width: 680px) {
    top: 33%;
    right: 4%;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    top: 32%;
    right: 4%;
  }
`;

const StyledPillButton = styled(motion.div)`
  width: 47%;
  max-width: 300px;
  min-width: 237px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 24px;
  background-color: ${colors.white};
  color: ${colors.black};
  font-weight: 500;
  border-radius: 26px;
  padding: 3vw;
  font-size: 25px;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  position: relative;
  border: 2px solid rgba(29, 29, 29, 0.1);
  transition: 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${colors.accent};
    border-color: ${colors.accent};
    color: ${colors.white};
    path {
      fill: ${colors.white};
    }
  }

  &:hover .styled-icon {
    transform: rotate(45deg);
  }

  @media all and (max-width: ${breakpoints.md}px) {
    padding: 2vw;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    min-width: 237px;
    padding: 4vw;
    font-size: 25px;
  }
`;
interface StyledPillButtonProps {
  text: string;
  children: React.ReactNode;
  className?: string;
}

const StyledPillIconButton: React.FC<StyledPillButtonProps> = ({
  className = "",
  text,
  children,
}) => (
  <StyledPillButton className={`styled-pill-button ${className}`}>
    <span>{text}</span>
    <StyledIcon className="styled-icon">{children}</StyledIcon>
  </StyledPillButton>
);

export function PillIconButton({
  text,
  className = "",
  children,
}: StyledPillButtonProps) {
  return (
    <StyledPillIconButton text={text} className={className}>
      {children}
    </StyledPillIconButton>
  );
}
