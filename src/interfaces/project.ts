export interface IProjectData {
  project: Project;
  projects: Projects;
}

export interface Projects {
  nodes: Project[];
}

export interface Project {
  title: string;
  slug: string;
  featuredImage: Image;
  projectFields: ProjectFields;
}

export interface Image {
  node: Node;
}

export interface Node {
  altText: string;
  sourceUrl: string;
}

export interface ProjectFields {
  content: Content[];
}

export interface Content {
  fieldGroupName: string;
  largeTextArea?: string;
  gallery1?: Gallery;
  dynamicTextAndImage?: DynamicTextAndImage[];
  paragraphItem?: ParagraphItem[];
  gallery2?: Gallery;
}

export interface DynamicTextAndImage {
  fieldGroupName: string;
  text: string;
  image?: Image;
}

export interface Image {
  node: Node;
}

export interface Node {
  altText: string;
  sourceUrl: string;
}

export interface Gallery {
  nodes: Node[];
}

export interface ParagraphItem {
  fieldGroupName?: string;
  title?: string;
  paragraph?: string;
  __typename?: string;
  largeParagraph?: string;
}

export interface Extensions {
  debug: Debug[];
}

export interface Debug {
  type: string;
  message: string;
}
