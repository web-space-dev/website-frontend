export interface IPageData {
  pageBySlug: PageBySlug;
}

export interface PageBySlug {
  id: string;
  title: string;
  slug: string;
  content: string;
}
