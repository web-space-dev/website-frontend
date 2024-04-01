"use client";
import styled from "@emotion/styled";
import React from "react";
import { breakpoints } from "../styles/variables";

const StyledBox = styled.div``;

const StyledHeading = styled.h2``;

const StyledForm = styled.form``;

const StyledLabel = styled.label``;

const StyledInput = styled.input``;

const StyledTextarea = styled.textarea``;

const StyledButton = styled.button``;

const StyledContact = styled.div``;

const StyledClose = styled.button``;

export function Contact({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <StyledBox>
        <StyledHeading>
          Get in contact and leave a little description of your request and one
          of our team will get back to you.
        </StyledHeading>
        <StyledForm>
          <StyledLabel htmlFor="name">Name</StyledLabel>
          <StyledInput type="text" id="name" name="name" />
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <StyledInput type="email" id="email" name="email" />
          <StyledLabel htmlFor="message">Message</StyledLabel>
          <StyledTextarea id="message" name="message" />
          <StyledLabel htmlFor="number">Number</StyledLabel>
          <StyledInput type="number" id="number" name="number" />
          <StyledButton type="submit">Submit</StyledButton>
        </StyledForm>
      </StyledBox>
      <StyledContact onClick={onClose}>
        <StyledClose>X</StyledClose>
      </StyledContact>
    </>
  );
}
