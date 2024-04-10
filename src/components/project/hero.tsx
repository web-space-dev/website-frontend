import Image from "next/image";
import { IProjectData, Project } from "../../interfaces/project";
import { colors, dimensions, breakpoints } from "../../styles/variables";
import styled from "@emotion/styled";
import { getRemSize } from "../../styles/globalCss";

const StyledDivImage = styled.div<StyledDivImageProps>`
  position: relative;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 585px;
`;
const StyledHeading1 = styled.h1``;
const StyledHeading2 = styled.h2``;
const StyledProjectFieldsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;
const StyledProjectField = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  margin: 10px;
`;
const StyledProjectFieldName = styled.p`
  font-weight: 500;
  letter-spacing: 6px;
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
`;

const StyledProjectFieldValue = styled.p`
  font-weight: 500;
  letter-spacing: 6px;
  font-size: ${getRemSize(dimensions.textSizes.large.desktop)};
`;

const StyledTags = styled.div``;

interface Props {
  project: Project;
}
interface StyledDivImageProps {
  image: string;
}
export function Hero({ project }: Props) {
  return (
    <>
      <StyledDivImage image={project.featuredImage.node.sourceUrl} />
      <StyledHeading1>{project.title}</StyledHeading1>
      <StyledHeading2>
        {project.projectCategories.nodes.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </StyledHeading2>
      <StyledProjectFieldsDiv>
        <StyledProjectField>
          <StyledProjectFieldName>
            {project.projectFields.stat1.field}
          </StyledProjectFieldName>
          <StyledProjectFieldValue>
            {project.projectFields.stat1.value}
          </StyledProjectFieldValue>
        </StyledProjectField>
        <StyledProjectField>
          <StyledProjectFieldName>
            {project.projectFields.stat2.field}
          </StyledProjectFieldName>
          <StyledProjectFieldValue>
            {project.projectFields.stat2.value}
          </StyledProjectFieldValue>
        </StyledProjectField>
        <StyledProjectField>
          <StyledProjectFieldName>
            {project.projectFields.stat3.field}
          </StyledProjectFieldName>
          <StyledProjectFieldValue>
            {project.projectFields.stat3.value}
          </StyledProjectFieldValue>
        </StyledProjectField>
      </StyledProjectFieldsDiv>
      <StyledTags>
        {project.tags.nodes.map((tag, index) => (
          <span key={index}>{tag.name}</span>
        ))}
      </StyledTags>
    </>
  );
}
