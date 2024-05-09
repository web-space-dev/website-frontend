"use client";
import axios from 'axios';
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { breakpoints, dimensions, colors } from "../styles/variables";
import { getRemSize } from "../styles/globalCss";
import ArrowUpRight from "../icons/arrowUpRight";
import Image from "next/image";
import { useAnimate, stagger, motion } from "framer-motion";

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
const StyledImage = styled.div<{ dark: boolean }>`
  position: absolute;
  top: 14px;
  left: 8px;
  z-index: 1001;
  color: ${(props) =>
    props.dark
      ? colors.white
      : colors.black}; // Changes the color based on the dark prop
  img {
    fill: currentColor; // Makes the SVG inherit the color property
  }
`;

const WrapperContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: scale(0.93);
  // margin-top: 232px;
  margin-top: 35px;

  @media all and (max-width: ${breakpoints.md}px) {
    margin-top: 28px;
  }

  @media (max-width: 600px) {
    transform: scale(0.95);
    margin-top: 28px;
  }

  @media (max-width: 500px) {
    transform: scale(0.96);
    margin-top: 28px;
  }

  @media (max-width: 375px) {
    transform: scale(0.95);
    margin-top: 28px;
  }
`;

const StyledBoxContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledBox = styled.div`
  background: rgba(255, 255, 255, 1);
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
  @media (max-width: 375px) {
    margin-top: 8px;
    overflow: auto;
    max-height: 80vh;
    margin-top: 30px;
  }
`;

const StyledHeading = styled.p`
  font-size: 36px;
  font-weight: 400;
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
  background-color: ${colors.white};
  color: ${colors.black};

  &:focus {
    outline: none;
  }
  @media all and (max-width: ${breakpoints.md}px) {
    width: 100%;
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

const StyledIcon = styled(ArrowUpRight)`
  height: 30px;
  margin-left: 28px; */

  transition: 0.3s ease;

`;
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  padding: 20px;
  margin-top: 16px;
  border-radius: 26px;
  width: 313px;
  margin-left: auto;
  margin-right: auto;
  height: 79px;
  color: rgba(29, 29, 29, 1);
  font-weight: 500;
  letter-spacing: 2px;
  border: 2px solid ${colors.blackLight};
  font-size: 24px;
  transition: 0.3s ease;

  &:hover {
    background-color: ${colors.accent};
    border-color: ${colors.accent};
    color: ${colors.white};

    path {
      fill: ${colors.white};
    }

    .styled-icon {
      transform: rotate(45deg);
    }
  }

  @media all and (max-width: ${breakpoints.md}px) {
    width: 100%;
    padding: 10px;
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
    margin-top: 15px;
  }
  @media (max-width: 600px) {
    margin-top: 15px;
  }

  @media (max-width: 500px) {
    margin-top: 8px;
  }

  @media (max-width: 375px) {
    margin-top: 8px;
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
  cursor: pointer;

  &:hover {
    background-color: rgba(57, 151, 156, 0.2);
  }
`;

const StyledPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  color: black;
  padding: 50px;
  border-radius: 20px;
  z-index: 1000;
  text-align: center;
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

  const [submitStatus, setSubmitStatus] = useState('idle')
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // Send a message to Slack
    try {
      await axios.post('/api/slack', data);

      // Optionally, you can handle success (e.g., show a success message)
      // console.log('Form submitted successfully');
      setSubmitStatus('success');
    } catch (error) {
      // Handle error
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }
  };
  return (
    <StyledWrapper>
      <StyledImage dark={dark}>
        <img src="/logo-icon-white.svg" alt="Logo" width={40} height={40} />
      </StyledImage>
      <WrapperContent>
        <StyledBox>
          <StyledBoxContentWrapper>
            <StyledHeading>
              Get in contact and leave a little description of your request and
              one of our team will get back to you.
            </StyledHeading>
            <StyledForm onSubmit={handleSubmit}>
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
              <StyledButton>
                Submit
                <StyledIcon className="styled-icon" />
              </StyledButton>
            </StyledForm>
          </StyledBoxContentWrapper>
        </StyledBox>

        <StyledContactWrapper>
          <StyledSquare dark={dark}> Contact </StyledSquare>
          <StyledSquare dark={dark} onClick={onClose}>
            <Image
              src={dark ? "/svg/icon-close.svg" : "/svg/icon-close-black.svg"}
              alt="close icon"
              width={24}
              height={24}
            />
          </StyledSquare>
        </StyledContactWrapper>
      </WrapperContent>

      {submitStatus === 'success' && (
      <StyledPopup>Form submitted successfully!</StyledPopup>
      )}
      {submitStatus === 'error' && (
        <StyledPopup>The form is not sent. Please try again.</StyledPopup>
      )}
    </StyledWrapper>
  );
}
