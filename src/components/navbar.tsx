"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import { usePathname } from "next/navigation";
import chatIcon from "../../public/svg/icon-chat.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { dimensions } from "../styles/variables";
import { colors } from "../styles/variables";
import { NavbarMobile } from "./global/navigation/navbarMobile";
import useIsDesktop from "../hooks/useIsDesktop";
import { Contact } from "./contact";
import { getRemSize } from "../styles/globalCss";

const StyledNav = styled.nav`
  display: flex;
  position: fixed;
  padding: 0px 0px 0px 3px;
  border-radius: 0.75rem;
  background-color: rgba(57, 151, 156, 0.2);
  width: max-content;
  backdrop-filter: blur(5px);
  z-index: 999;

  @media (min-width: 700px) {
    height: auto;
    bottom: 16px;
    left: 5%;
    right: 5%;
    margin: auto;
    gap: 0.5rem;

    @media (max-width: 700px) {
      display: none;
    }
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & a:first-child {
    margin: 0.3rem 0.4rem 0.3rem 0.2rem;
  }

  & a:last-child {
    margin: 0.3rem 0.1rem 0.3rem 0.4rem;
  }

  & a:not(:first-child):not(:last-child) {
    margin: 0.3rem 0.4rem;
  }
`;

const StyledLink = styled.a<NavbarProps>`
  padding: 0px 16px 2px 16px;
  margin: 16px;
  letter-spacing: 0.05455rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  color: ${(props) => (props.dark ? colors.white : colors.black)};
  text-decoration: none;
  font-size: ${getRemSize(dimensions.headingSizes.medium.mobile)};

  &:hover,
  &:active,
  &:visited {
    background-color: rgba(57, 151, 156, 0.2);
    color: ${(props) => (props.dark ? colors.white : colors.black)};
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

type StyledSpanProps = {
  isActive: boolean;
};

interface NavbarProps {
  dark: boolean;
}

export const StyledNavSpan = styled.span<StyledSpanProps & NavbarProps>`
  box-shadow: 0 -0.5px 0 0.5px ${(props) => (!props.isActive ? "transparent" : props.dark ? colors.white : colors.black)};
  width: 1.5rem;
  transition: all 0.3s ease-in-out;

  @media (max-width: 700px) {
    display: none;
  }
`;

export default function Navbar({ dark }) {
  const pathname = usePathname();
  const isDesktop = useIsDesktop();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const iconStyle = {
    width: "1rem",
    margin: "-0.25rem 0",
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const links = [
    { name: "About", path: "" },
    { name: "Projects", path: "projects" },
    { name: "Client space", path: "#" },
    { name: "chat", path: "#", icon: chatIcon, onClick: openContactModal },
  ];

  return (
    <>
      {/* desktop */}
      {isDesktop ? (
        <StyledNav>
          {links.map((link, index) => (
            <StyledDiv key={index}>
              <StyledLink
                href={`/${link.path}`}
                dark={dark}
                onClick={(event) => {
                  if (link.onClick) {
                    event.preventDefault();
                    link.onClick();
                  }
                }}
              >
                {link.icon ? (
                  <Image src={link.icon} alt={link.name} style={iconStyle} />
                ) : (
                  link.name
                )}
              </StyledLink>
              <StyledNavSpan
                isActive={pathname === `/${link.path}`}
                dark={dark}
              />
            </StyledDiv>
          ))}
        </StyledNav>
      ) : (
        <NavbarMobile dark={dark} links={links} />
      )}
      <Contact
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        dark={undefined}
      />
    </>
  );
}
