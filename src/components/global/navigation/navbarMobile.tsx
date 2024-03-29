import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styled from "@emotion/styled";
import { StyledNavSpan } from "../../navbar";
import { colors } from "../../../styles/variables";

const StyledNavMobile = styled.nav<{ dark: boolean; isMenuOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem;
  z-index: 999;
  backdrop-filter: ${(props) => (props.isMenuOpen ? "blur(15px)" : "0")};
  width: ${(props) => (props.isMenuOpen ? "100vw" : "auto")};
  height: ${(props) => (props.isMenuOpen ? "100vh" : "auto")};
  transition: ${(props) =>
    props.isMenuOpen ? "backdrop-filter 0.3s ease-in-out" : "none"};
  mask-image: ${(props) =>
    props.isMenuOpen
      ? "linear-gradient(to bottom, #000000 0%, #000000 50%, #000000a3 75%, #00000045 100%)"
      : "none"};
`;
const StyledBtnMobile = styled.button`
  all: unset;
  display: flex;
  border-radius: 1rem;
  width: 2rem;
  height: 2rem;
  background-color: ${colors.accentLight};
  padding: 0.25rem;
  margin-bottom: 1rem;

  &:hover {
    background-color: ${colors.accent};
  }
`;

const StyledDivMobile = styled.div<IStyledDivMobileProps>`
  display: flex;
  background-color: ${colors.accentLight};
  backdrop-filter: blur(5px);
  border-radius: 2rem;
  border: 2px solid ${colors.accent};
  opacity: 0;
  animation: fadeIn 0.5s forwards;
  animation-delay: ${(props) => props.index * 0.1}s;
  transition: background-color 0.3s ease-in-out;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  &:hover {
    background-color: ${colors.accent};
  }
`;
const StyledWrapperMobile = styled.div<{ isMenuOpen: boolean }>`
  display: ${(props) => (props.isMenuOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
`;
const StyledLinkMobile = styled.a<{ dark: boolean }>`
  padding: 0.25rem 0.75rem;
  margin: 0.25rem 0;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  color: ${(props) => (props.dark ? colors.white : colors.black)};
  text-decoration: none;

  &:hover {
    color: ${colors.white}!important;
  }

  &:focus {
    color: ${colors.white}!important;
  }
`;

interface NavbarMobileProps {
  dark: boolean;
  links: {
    name: string;
    path: string;
    icon?: string | undefined;
  }[];
}

interface IStyledDivMobileProps {
  index: number;
}

export function NavbarMobile({ dark, links }: NavbarMobileProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const iconStyleMenu = {
    margin: "auto",
  };

  const iconStyle = {
    width: "1rem",
    margin: "-0.25rem 0",
  };

  return (
    <StyledNavMobile isMenuOpen={isMenuOpen} dark={dark}>
      <StyledBtnMobile onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? (
          <Image
            src={"/svg/icon-close.svg"}
            alt="close icon"
            style={iconStyleMenu}
            width={24}
            height={24}
          />
        ) : (
          <Image
            src={"/svg/icon-burger.svg"}
            alt="burger icon"
            style={iconStyleMenu}
            width={24}
            height={24}
          />
        )}
      </StyledBtnMobile>
      <StyledWrapperMobile isMenuOpen={isMenuOpen}>
        {links.map((link, index) => (
          <StyledDivMobile key={index} index={index}>
            <StyledLinkMobile href={`/${link.path}`} dark={dark}>
              {link.icon && (
                <Image src={link.icon} alt={link.name} style={iconStyle} />
              )}
              {!link.icon && link.name}
            </StyledLinkMobile>
            <StyledNavSpan
              isActive={pathname === `/${link.path}`}
              dark={dark}
            />
          </StyledDivMobile>
        ))}
      </StyledWrapperMobile>
    </StyledNavMobile>
  );
}
