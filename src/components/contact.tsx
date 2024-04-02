"use client";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { breakpoints, dimensions, colors } from "../styles/variables";
import { getRemSize } from "../styles/globalCss";
import { css } from "@emotion/react";
import ArrowUpRight from "../icons/arrowUpRight";

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(29, 29, 29, 0.2);
  backdrop-filter: blur(15px);
  z-index: 1000;
  // display: flex; // Add this
  // justify-content: center; // Add this
  // align-items: center;
  // flex-direction: column; // Add this
`;

const WrapperContent = styled.div`
  display: flex;
  justify-content: center; // Add this
  align-items: center;
  flex-direction: column;
`;

const StyledBoxContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledBox = styled.div`
  background: ${colors.white};
  margin-top: 60px;
  padding: 40px 40px;
  border-radius: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  overflow: hidden;
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
  margin-bottom: 1rem;
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
  border-radius: 26px;
  width: 281px;
  margin-left: auto;
  margin-right: auto;
  height: 79px;
  color: rgba(29, 29, 29, 1);
  font-weight: 180;
  letter-spacing: 1px;
  border: 2px solid ${colors.blackLight};
  font-size: ${getRemSize(dimensions.headingSizes.cta.mobile)};
  font-family: "Darker Grotesque", sans-serif;
  transition: 0.3s ease;

  &:hover {
    background-color: ${colors.accent};
    border-color: ${colors.accent};
    color: ${colors.white};

    path {
      fill: ${colors.white};
    }
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

const StyledContact = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  max-width: 500px;
  max-height: 500px;
  overflow: auto;
  margin-left: auto;
  margin-right: auto;
`;

const StyledClose = styled.button``;

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

export function Contact({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <StyledWrapper>
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
                type="text"
                id="message"
                name="message"
                placeholder="Message"
              />
              <InputField
                type="number"
                id="number"
                name="number"
                placeholder="Number"
              />
              <StyledButton type="submit">
                Submit
                <StyledIcon />
              </StyledButton>
            </StyledForm>
          </StyledBoxContentWrapper>
        </StyledBox>

        <StyledContact onClick={onClose}>
          <StyledClose>X</StyledClose>
        </StyledContact>
      </WrapperContent>
    </StyledWrapper>
  );
}
