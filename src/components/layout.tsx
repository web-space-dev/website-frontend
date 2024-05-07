import { ISiteData } from "../interfaces/site";
import { StyledWrapper } from "../styles/styled-wrapper";
import Footer from "./global/footer";
import Wrapper from "./global/wrapper";

interface ILayout {
  children: React.ReactNode;
  pageTitle?: string;
  siteData?: ISiteData;
}

export default function Layout({ pageTitle, siteData, children }: ILayout) {
  return (
    <StyledWrapper>
      <Wrapper pageTitle={pageTitle} siteData={siteData} />

      <main>{children}</main>

      <Footer />
    </StyledWrapper>
  );
}
