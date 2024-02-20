import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styled from "@emotion/styled";
import { StyledNavSpan } from "../../navbar";
import { colors } from "../../../styles/variables";

const StyledNavMobile = styled.nav<{ dark: boolean; isMenuOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  padding: 0.5rem 0.5rem;
  border-radius: 0.75rem;
  /* background-color: rgba(57, 151, 156, 0.2); */
  background-color: ${colors.accentLight};
  backdrop-filter: blur(5px);
  transition: all 0.2s ease;

  @media (max-width: 700px) {
    width: ${(props) => (props.isMenuOpen ? "100vw" : "2rem")};
    height: ${(props) => (props.isMenuOpen ? "100vh" : "2rem")};
    top: ${(props) => (props.isMenuOpen ? "0" : "1rem")};
    right: ${(props) => (props.isMenuOpen ? "0" : "1rem")};
    border-radius: ${(props) => (props.isMenuOpen ? "0" : "0.75rem")};
    flex-direction: ${(props) => (props.isMenuOpen ? "column" : "row")};
    align-items: ${(props) => (props.isMenuOpen ? "flex-start" : "center")};
    z-index: 999;
  }

  @media (min-width: 700px) {
    display: none;
    width: max-content;
  }
`;
const StyledBtnMobile = styled.button<{ isMenuOpen: boolean }>`
  all: unset;
  display: flex;
  margin: ${(props) => (props.isMenuOpen ? "1rem 1rem unset auto" : "unset")};
  /* margin-right: ${(props) => (props.isMenuOpen ? "1rem" : "auto")}; */
  /* margin-top: ${(props) => (props.isMenuOpen ? "1rem" : "auto")}; */
  /* margin-left: ${(props) => (props.isMenuOpen ? "auto" : "auto")}; */
`;

const StyledDivMobile = styled.div<{ isMenuOpen: boolean }>`
  display: ${(props) => (props.isMenuOpen ? "flex" : "none")};
`;
const StyledWrapperMobile = styled.div<{ isMenuOpen: boolean }>`
  display: ${(props) => (props.isMenuOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  margin: auto;
`;
const StyledLinkMobile = styled.a<{ dark: boolean }>`
  padding: 0.25rem 0.75rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  color: ${(props) => (props.dark ? colors.white : colors.black)};
  text-decoration: none;

  @media (min-width: 700px) {
    display: none;
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

  const iconStyleMobile = {
    margin: "auto",
  };

  const iconStyle = {
    width: "1rem",
    margin: "-0.25rem 0",
  };

  return (
    <StyledNavMobile dark={dark} isMenuOpen={isMenuOpen}>
      <StyledBtnMobile
        isMenuOpen={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <Image
            src={"/svg/icon-close.svg"}
            alt="close icon"
            style={iconStyleMobile}
            width={24}
            height={24}
          />
        ) : (
          <Image
            src={"/svg/icon-burger.svg"}
            alt="burger icon"
            style={iconStyleMobile}
            width={24}
            height={24}
          />
        )}
      </StyledBtnMobile>
      <StyledWrapperMobile isMenuOpen={isMenuOpen}>
        {links.map((link, index) => (
          <StyledDivMobile key={index} isMenuOpen={isMenuOpen}>
            <StyledLinkMobile href={`/${link.path}`} dark={dark}>
              {link.icon ? (
                <Image src={link.icon} alt={link.name} style={iconStyle} />
              ) : (
                link.name
              )}
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
