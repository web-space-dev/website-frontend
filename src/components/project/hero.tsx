import Image from "next/image";
import { IProjectData, Project } from "../../interfaces/project";
import { colors, dimensions, breakpoints } from "../../styles/variables";
import styled from "@emotion/styled";
import { getRemSize } from "../../styles/globalCss";
import { Row } from "../global/grid/Row";
import { Col } from "../global/grid/Col";
import ArrowUpRight from "../../icons/arrowUpRight";

interface IStyledDivImage {
  imageSrc: string;
}
const StyledDivImage = styled.div<IStyledDivImage>`
  overflow: hidden;
  position: absolute;
  background-image: url(${(props) => props.imageSrc});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 585px;
  left: 0;
  top: 0;
  z-index: -1;
`;

const StyledHeading1 = styled.h1`
  font-size: ${getRemSize(dimensions.headingSizes.display2.mobile)};
  font-weight: 400;
  letter-spacing: 6px;
  color: ${colors.white};
`;

const StyledHeading2 = styled.h2`
  font-size: ${getRemSize(dimensions.headingSizes.cta.mobile)};
  font-weight: 400;
  letter-spacing: 6px;
  color: ${colors.white};
`;

const StyledTitleRow = styled(Row)`
  margin: 239px 0 112px 0;
`;

const StyledProjectFieldsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;
const StyledProjectField = styled.div`
  min-width: 347px;
  min-height: 127px;
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  margin: 10px;
  backdrop-filter: blur(15px);
`;
const StyledProjectFieldName = styled.p`
  font-weight: 500;
  letter-spacing: 4px;
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  opacity: 80%;
  margin: 0px;
  padding: 0px;
`;

const StyledProjectFieldValue = styled.p`
  font-weight: 500;
  letter-spacing: 4px;
  font-size: ${getRemSize(dimensions.textSizes.large.desktop)};
  margin: 0px;
  padding: 0px 0px 6px 0px;
  line-height: 0.67;
`;

const StyledTagsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledTag = styled.div`
  display: flex;
  flex-direction: column;
  padding: 11px 35px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  margin: 10px;
  backdrop-filter: blur(15px);
  gap: 16px;
  letter-spacing: 1px;
  font-size: ${getRemSize(dimensions.textSizes.normal.desktop)};
  font-weight: 400;
`;

const StyledArrowUpRight = styled(ArrowUpRight)`
  margin-left: 21px;
`;

const StyledOutlineArrowButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 16px;
  backgorund-color: ${colors.black};
  border: 2px solid ${colors.white};
  border-radius: 20px;
  color: ${colors.white};
  cursor: pointer;
  font-size: ${getRemSize(dimensions.headingSizes.cta.mobile)};
  font-weight: 400;
  transition: 0.3s ease;
  path {
    fill: ${colors.white};
  }

  &:hover {
    border: 2px solid ${colors.accent};
    color: ${colors.accent};
    path {
      fill: ${colors.accent};
    }
  }
  &:hover .styled-icon {
    transform: rotate(45deg);
  }
`;

interface Props {
  project: Project;
}

export function Hero({ project }: Props) {
  return (
    <>
      <StyledDivImage imageSrc={project.featuredImage?.node.sourceUrl} />
      <StyledTitleRow>
        <Col start={3} span={7}>
          <StyledHeading1>{project.title}</StyledHeading1>
        </Col>
        <Col span={3}>
          <StyledHeading2>
            {project.projectCategories.nodes.map((item, index) => (
              <span key={index}>{item.name}</span>
            ))}
          </StyledHeading2>
        </Col>
      </StyledTitleRow>

      {/* </Row> */}
      <Col span={12}>
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
      </Col>
      <Col span={12}>
        <StyledTagsWrapper>
          {project.tags.nodes.map((tag, index) => (
            <StyledTag>
              <span key={index}>{tag.name}</span>
            </StyledTag>
          ))}
          <StyledOutlineArrowButton>
            {" "}
            Website <StyledArrowUpRight className="styled-icon" />{" "}
          </StyledOutlineArrowButton>
        </StyledTagsWrapper>
      </Col>
    </>
  );
}
