import styled from "@emotion/styled";
import Image from "next/image";
import { colors } from "../../styles/variables";
import ArrowUpRight from "../../icons/arrowUpRight";

const StyledIconButton = styled.button`
  /* width: 58px;
  height: 70px;
  padding: 20px 14px; */
  width: 3.5rem;
  height: 3rem;
  padding: 0;
  border: 2px solid ${colors.blackLight};
  transition: 0.3s ease;
  border-radius: 1rem;

  &:hover {
    background-color: ${colors.accent};
    border-color: ${colors.accent};

    path {
      fill: ${colors.white};
    }
  }
`;

const StyledIcon = styled(ArrowUpRight)`
  /* width: 30px;
  height: 30px;
  margin-left: -2px; */

  transition: 0.3s ease;

  &:hover {
    transform: rotate(45deg);
  }
`;

interface IconButtonProps {
  link: string;
}

export function IconButton() {
  return (
    <StyledIconButton>
      <StyledIcon />
    </StyledIconButton>
  );
}
