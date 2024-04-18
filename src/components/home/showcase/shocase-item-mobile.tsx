import styled from "@emotion/styled";
import { Project } from "../../../interfaces/project";
import Image from "next/image";
import { IconButton } from "../../global/iconButton";

const StyledShowcaseWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 343px;
  height: 537px;
  flex-direction: column;
  margin: 0 4px;
  /* perspective: 500px; */
  /* scroll-snap-align: ${({ isOpen }) => (isOpen ? "start" : "none")}; */
`;

const StyledShowcaseImage = styled.div`
  /* Add your styles for StyledShowcaseImage here */
  height: 440px;
  & img {
    object-fit: cover;
    border-radius: 12px;
  }
`;

const StyledShowcaseDetails = styled.div`
  /* Add your styles for StyledShowcaseDetails here */
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledShowcaseContentWrapper = styled.div`
  /* Add your styles for StyledShowcaseContentWrapper here */
`;

const StyledShowcaseTitle = styled.h2`
  /* Add your styles for StyledShowcaseTitle here */
`;

const StyledShowcaseCategory = styled.p`
  /* Add your styles for StyledShowcaseCategory here */
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

interface ShowcaseItemProps {
  project: Project;
  // isOpen: boolean;
  // canSnapScroll: boolean;
  // showAllProjects: boolean;
  // reverseScale: () => void;
}

export default function ShowcaseItemMobile({ project }: ShowcaseItemProps) {
  return (
    <StyledShowcaseWrapper>
      <StyledShowcaseImage>
        <Image
          src={project.featuredImage?.node.sourceUrl}
          alt={`Cover Image for ${project.title}`}
          blurDataURL={project.featuredImage?.node.placeholderDataURI}
          width={343}
          height={440}
        />
      </StyledShowcaseImage>
      <StyledShowcaseDetails>
        <StyledShowcaseContentWrapper>
          {/* Title */}
          <StyledShowcaseTitle>{project.title}</StyledShowcaseTitle>
          {/* Category */}
          <StyledShowcaseCategory>
            {project.projectCategories?.nodes[0]?.name}
          </StyledShowcaseCategory>
        </StyledShowcaseContentWrapper>
        {/* ArrowIcon */}
        <StyledLink href={`/projects/${project.slug}`}>
          <IconButton />
        </StyledLink>
      </StyledShowcaseDetails>
    </StyledShowcaseWrapper>
  );
}
