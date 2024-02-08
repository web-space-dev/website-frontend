import styled from "@emotion/styled";
import Link from "next/link";
import { usePathname } from "next/navigation";
import chatIcon from "../../public/icon-chat.svg";
import Image from "next/image";

const StyledNav = styled.nav`
  display: flex;
  position: fixed;
  bottom: 16px;
  left: 25%;
  right: 25%;
  margin: auto;
  padding: 0 0.5rem;
  border-radius: 0.75rem;
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
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  color: #000;
  text-decoration: none;

  &:hover {
    background-color: rgba(57, 151, 156, 0.2);
  }
`;

const iconStyle = {
  width: '1rem',
  margin: '-0.5rem 0'
}
type StyledSpanProps = {
  isActive: boolean;
};

const StyledSpan = styled.span<StyledSpanProps>`
  // border-bottom: 1px solid
  //   ${(props) => (!props.isActive ? "transparent" : "black")};
  box-shadow: 0 -0.5px 0 0.5px ${(props) => (!props.isActive ? "transparent" : "black")};
  width: 1.5rem;
  transition: all 0.3s ease-in-out;
`;

const links = [
  { name: "About", path: "about" },
  { name: "Projects", path: "projects" },
  { name: "Client space", path: "client" },
  { name: "chat", path: "#", icon: chatIcon },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <StyledNav>
      {links.map((link, index) => (
        <StyledDiv key={index}>
          <StyledLink href={`/${link.path}`}>
            {link.icon ? (
              <Image src={link.icon} alt={link.name} style={iconStyle}/>
            ) : (
              link.name
            )}
          </StyledLink>
          <StyledSpan isActive={pathname === `/${link.path}`} />
        </StyledDiv>
      ))}
    </StyledNav>
  );
}

{
  /* <script>
  let market = document.querySelector('#marker');
  let item = document.querySelector('nav a')'

  function indicator(e) {
    marker.style.left = e.offsetLeft+'px';
    marker.style.width = e.offsetWidht+'px';
  }

  item.forEach(link => {
    link.addEventListener('click', (e) => {
      indicator(e.target);
    })
  })
</script> */
}
