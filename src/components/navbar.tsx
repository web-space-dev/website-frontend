"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { usePathname } from "next/navigation";
import chatIcon from "../../public/svg/icon-chat.svg";
import burgerIcon from "../../public/svg/icon-burger.svg";
import closeIcon from "../../public/svg/icon-close.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

const StyledNav = styled.nav`
  display: flex;
  position: fixed;
  padding: 0 0.5rem;
  border-radius: 0.75rem;
  background-color: rgba(57, 151, 156, 0.2);
  width: max-content;
  backdrop-filter: blur(5px);

  @media (min-width: 700px) {
    height: "auto";
    bottom: 16px;
    left: 5%;
    right: 5%;
    margin: auto;

    @media (max-width: 700px) {
      display: none;
    }
  }
`;

const StyledNavMobile = styled.nav<{ isMenuOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  padding: 0.5rem 0.5rem;
  border-radius: 1.25rem;
  background-color: rgba(57, 151, 156, 0.2);
  width: max-content;
  backdrop-filter: blur(5px);

  @media (max-width: 700px) {
    width: ${(props) => (props.isMenuOpen ? "auto" : "2rem")};
    height: ${(props) => (props.isMenuOpen ? "auto" : "2rem")};
    top: 1rem;
    right: 1rem;
    flex-direction: ${(props) => (props.isMenuOpen ? "column" : "row")};
    align-items: ${(props) => (props.isMenuOpen ? "flex-start" : "center")};
  }

  @media (min-width: 700px) {
    display: none;
  }
`;

const StyledBtnMobile = styled.button<{ isMenuOpen: boolean }>`
  all: unset;
  display: flex;
  margin-right: ${(props) => (props.isMenuOpen ? "0.5rem" : "auto")};
  margin-left: ${(props) => (props.isMenuOpen ? "auto" : "auto")};
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDivMobile = styled.div<{ isMenuOpen: boolean }>`
  width: 20vw;
  display: ${(props) => (props.isMenuOpen ? "flex" : "none")};
`;

const StyledLink = styled.a`
  padding: 0.25rem 0.75rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  color: #000;
  text-decoration: none;

  &:hover {
    background-color: rgba(57, 151, 156, 0.2);
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const StyledLinkMobile = styled.a`
  padding: 0.25rem 0.75rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  color: #000;
  text-decoration: none;

  @media (min-width: 700px) {
    display: none;
  }
`;

const iconStyle = {
  width: "1rem",
  margin: "-0.5rem 0",
};

type StyledSpanProps = {
  isActive: boolean;
};

const StyledSpan = styled.span<StyledSpanProps>`
  box-shadow: 0 -0.5px 0 0.5px ${(props) => (!props.isActive ? "transparent" : "black")};
  width: 1.5rem;
  transition: all 0.3s ease-in-out;

  @media (max-width: 700px) {
    display: none;
  }
`;

const links = [
  { name: "About", path: "about" },
  { name: "Projects", path: "projects" },
  { name: "Client space", path: "client" },
  { name: "chat", path: "#", icon: chatIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth > 700);
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const iconStyleMobile = {
    margin: "auto",
  };

  return (
    <>
      {/* desktop */}
      {isDesktop && (
        <StyledNav>
          {links.map((link, index) => (
            <StyledDiv key={index}>
              <StyledLink href={`/${link.path}`}>
                {link.icon ? (
                  <Image src={link.icon} alt={link.name} style={iconStyle} />
                ) : (
                  link.name
                )}
              </StyledLink>
              <StyledSpan isActive={pathname === `/${link.path}`} />
            </StyledDiv>
          ))}
        </StyledNav>
      )}

      {/* mobile */}
      {!isDesktop && (
        <StyledNavMobile isMenuOpen={isMenuOpen}>
          <StyledBtnMobile
            isMenuOpen={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <Image
                src={closeIcon}
                alt="burger icon"
                style={iconStyleMobile}
              />
            ) : (
              <Image
                src={burgerIcon}
                alt="close icon"
                style={iconStyleMobile}
              />
            )}
          </StyledBtnMobile>
          {links.map((link, index) => (
            <StyledDivMobile key={index} isMenuOpen={isMenuOpen}>
              <StyledLinkMobile href={`/${link.path}`}>
                {link.icon ? (
                  <Image src={link.icon} alt={link.name} style={iconStyle} />
                ) : (
                  link.name
                )}
              </StyledLinkMobile>
              <StyledSpan isActive={pathname === `/${link.path}`} />
            </StyledDivMobile>
          ))}
        </StyledNavMobile>
      )}
    </>
  );
}
