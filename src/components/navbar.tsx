import styled from "@emotion/styled";
import Link from "next/link";
import { usePathname } from "next/navigation";

const StyledNav = styled.nav`
  display: flex;
  position: fixed;
  bottom: 8px;
  left: 25%;
  right: 25%;
  margin: auto;
  border-radius: 1rem;
  background-color: rgba(57, 151, 156, 0.2);
  width: max-content;
  backdrop-filter: blur(5px);
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLink = styled(Link)`
  padding: 0.25rem 0.75rem;
  margin: 0.5rem 0;
  border-radius: 0.75rem;
  transition: all 0.5s ease-in-out;
  color: #000;
  text-decoration: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

type StyledSpanProps = {
  isActive: boolean;
};

const StyledSpan = styled.span<StyledSpanProps>`
  border-bottom: 1px solid
    ${(props) => (!props.isActive ? "transparent" : "black")};
  width: 1.5rem;
`;

const links = [
  { name: "About", path: "" },
  { name: "Projects", path: "#" },
  { name: "Client space", path: "#" },
  { name: "chat", path: "#" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <StyledNav>
      {links.map((link, index) => (
        <StyledDiv key={index}>
          <StyledLink href={`/${link.path}`}>{link.name}</StyledLink>
          <StyledSpan isActive={pathname === `/${link.path}`} />
        </StyledDiv>
      ))}
    </StyledNav>
  );
}
