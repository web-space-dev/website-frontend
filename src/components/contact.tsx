"use client";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { breakpoints, dimensions, colors } from "../styles/variables";
import { getRemSize } from "../styles/globalCss";
import { css } from "@emotion/react";
import ArrowUpRight from "../icons/arrowUpRight";
import Image from "next/image";

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(29, 29, 29, 0.2);
  backdrop-filter: blur(15px);
  z-index: 1000;
`;
const StyledImage = styled.div`
  position: absolute;
  top: -6px;
  left: -11px;
  z-index: 1001;
`;

const WrapperContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: scale(0.78);

  @media (max-width: 600px) {
    transform: scale(${0.78 * 0.85}); // 0.663
  }

  @media (max-width: 500px) {
    transform: scale(${0.78 * 0.8}); // 0.624
  }

  @media (max-width: 375px) {
    transform: scale(${0.78 * 0.75}); // 0.585
  }
`;

const StyledBoxContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledBox = styled.div`
  background: ${colors.white};
  margin-top: 24px;
  padding: 40px;
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  overflow: hidden;

  @media all and (max-width: ${breakpoints.md}px) {
    max-width: 100%;
    padding: 30px;
  }
  @media all and (max-width: ${breakpoints.sm}px) {
    max-width: 100%;
    padding: 25px;
  }
`;

const StyledHeading = styled.p`
  font-size: 36px;
  font-weight: 430;
  line-height: 42px;
  color: ${colors.black};
  letter-spacing: 1px;
  opacity: 0.87;
  margin: 0px 0px 30px 0px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputWrapper = styled.div`
  margin: 0px;
  position: relative;
`;

const StyledInput = styled.input`
  margin: 0px;
  width: 100%;
  height: 63px;
  width: 515px;
  border-radius: 12px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 1);
  color: ${colors.black};

  &:focus {
    outline: none;
  }
  @media all and (max-width: ${breakpoints.md}px) {
    width: 100%;
    padding: 10px;
  }
`;

const Label = styled.label`
  margin-left: 10px;
  position: absolute;
  left: 0.6rem;
  top: 0.6rem;
  transition: all 0.3s ease;
  pointer-events: none;
  background-color: transparent;
  color: ${colors.black};

  &.active {
    top: -2px;
    left: 11px;
    font-size: 0.75rem;
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 20px;
  margin-top: 16px;
  border-radius: 26px;
  width: 313px;
  margin-left: auto;
  margin-right: auto;
  height: 79px;
  color: rgba(29, 29, 29, 1);
  font-weight: 100;
  letter-spacing: 2px;
  border: 2px solid ${colors.blackLight};
  font-size: ${getRemSize(dimensions.headingSizes.small.mobile)};
  font-family: "Darker Grotesque", sans-serif !important;
  transition: 0.3s ease;

  &:hover {
    background-color: ${colors.accent};
    border-color: ${colors.accent};
    color: ${colors.white};

    path {
      fill: ${colors.white};
    }
  }
  &.my-button {
    font-family: "Darker Grotesque", sans-serif !important;
  }
  @media all and (max-width: ${breakpoints.md}px) {
    width: 100%;
    padding: 10px;
  }
`;

const StyledIcon = styled(ArrowUpRight)`
  height: 30px;
  margin-left: 28px; */

  transition: 0.3s ease;

  &:hover {
    transform: rotate(45deg);
  }
`;

const StyledContactWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 596px;
  background-color: rgba(57, 151, 156, 0.2);
  padding: 10px;
  border-radius: 20px;
  height: 70px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;

  @media all and (max-width: ${breakpoints.md}px) {
    width: 100%;
  }
`;

const StyledSquare = styled.div<StyledSquareProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1;
  letter-spacing: 1.2px;
  color: ${(props) => (props.dark ? colors.white : colors.black)};
  font-size: 34px;
  padding: 11px 12px 12px 13px;
  border-radius: 14px;
  transition: all 0.3s ease-in-out;
  backfdrop-filter: blur(15px);
  // background-color: ${colors.white};

  &:hover {
    background-color: rgba(57, 151, 156, 0.2);
  }
`;

interface StyledSquareProps {
  dark: boolean;
}

const InputField = ({ type, id, name, placeholder }) => {
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setIsActive(false);
    }
  };

  return (
    <InputWrapper>
      <StyledInput
        type={type}
        id={id}
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Label htmlFor={id} className={isActive ? "active" : ""}>
        {placeholder}
      </Label>
    </InputWrapper>
  );
};

export function Contact({ isOpen, onClose, dark }) {
  if (!isOpen) {
    return null;
  }

  return (
    <StyledWrapper>
      <StyledImage>
        <img
          src="/favicon/Icon-logo-nobackground.png"
          alt="Logo"
          width={70}
          height={70}
        />
      </StyledImage>
      <WrapperContent>
        <StyledBox>
          <StyledBoxContentWrapper>
            <StyledHeading>
              Get in contact and leave a little description of your request and
              one of our team will get back to you.
            </StyledHeading>
            <StyledForm>
              <InputField
                type="text"
                id="name"
                name="name"
                placeholder="Name"
              />
              <InputField
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
              <InputField
                type="tel"
                id="number"
                name="number"
                placeholder="Number"
              />
              <InputField
                type="text"
                id="message"
                name="message"
                placeholder="Message"
              />
              <StyledButton type="submit" className="my-button">
                Submit
                <StyledIcon />
              </StyledButton>
            </StyledForm>
          </StyledBoxContentWrapper>
        </StyledBox>

        <StyledContactWrapper>
          <StyledSquare dark={dark}> Contact </StyledSquare>
          <StyledSquare dark={dark} onClick={onClose}>
            <Image
              // src={"/svg/icon-close.svg"}
              src={dark ? "/svg/icon-close.svg" : "/svg/icon-close-black.svg"}
              alt="close icon"
              width={24}
              height={24}
            />
          </StyledSquare>
        </StyledContactWrapper>
      </WrapperContent>
    </StyledWrapper>
  );
}
