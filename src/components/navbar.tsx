import styled from "@emotion/styled";
import Link from "next/link";
import { usePathname } from "next/navigation";
import chatIcon from "../../public/svg/icon-chat.svg";
import burgerIcon from "../../public/svg/icon-burger.svg";
import logoIcon from "../../public/svg/icon-logo.svg";
import Image from "next/image";
import { useState } from "react";

const StyledNav = styled.nav`
  display: flex;
  position: fixed;
  bottom: 16px;
  left: 5%;
  right: 5%;
  margin: auto;
  padding: 0 0.5rem;
  border-radius: 0.75rem;
  background-color: rgba(57, 151, 156, 0.2);
  width: max-content;
  height: ${(props) => (props.extendNavbar ? "50vh" : "auto")};
  backdrop-filter: blur(5px);

  @media (min-width: 700px) {
    height: auto;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLink = styled(Link)`
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
const StyledLinkExtended = styled(Link)`
  padding: 0.25rem 0.75rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  color: #000;
  text-decoration: none;

  &:hover {
    background-color: rgba(57, 151, 156, 0.2);
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

const OpenLinksButton = styled.button`
  width: 1rem;
  height: 1rem;
  background: none;
  border: none;
  cursor: pointer;

  @media (min-width: 700px) {
    display: none;
  }
`;

const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 700px) {
    display: none;
  }
`;

export default function Navbar() {
  const pathname = usePathname();
  const [extendNavbar, setExtendNavbar] = useState(false);

  return (
    <StyledNav extendNavbar={extendNavbar}>
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
      <OpenLinksButton onClick={() => setExtendNavbar((curr) => !curr)}>
        {extendNavbar ? (
          <> &#10005; </>
        ) : (
          <Image src={burgerIcon} alt="burger" />
        )}
      </OpenLinksButton>
      {extendNavbar && (
        <NavbarExtendedContainer>
          {links.map((link, index) => (
            <StyledDiv key={index}>
              <StyledLinkExtended href={`/${link.path}`}>
                {link.icon ? (
                  <Image src={link.icon} alt={link.name} style={iconStyle} />
                ) : (
                  link.name
                )}
              </StyledLinkExtended>
              <StyledSpan isActive={pathname === `/${link.path}`} />
            </StyledDiv>
          ))}
        </NavbarExtendedContainer>
      )}
    </StyledNav>
  );
}
