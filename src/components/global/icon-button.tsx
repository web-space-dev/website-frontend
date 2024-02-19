import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { colors } from "../../styles/variables";

const StyledIconButton = styled.button`
  width: 58px;
  height: 70px;
  padding: 20px 14px;
  border: 2px solid ${colors.blackLight};
  /* background-color: red; */
  &:hover {
    fill: ${colors.white};
    background-color: ${colors.accent};

    border-color: ${colors.accent};
  }
`;

interface IconButtonProps {
  link: string;
}

export function IconButton({ link }: IconButtonProps) {
  return (
    <StyledIconButton>
      <Image
        src="/icons/arrow-up-right.svg"
        alt="arrow-right"
        width={30}
        height={30}
      />
    </StyledIconButton>
  );
}
