import { ISiteData } from "../interfaces/site";
import { StyledWrapper } from "../styles/styled-wrapper";
import { darkerGrotesque } from "../styles/variables";
import Footer from "./global/footer";
import Wrapper from "./global/wrapper";

interface ILayout {
  preview: boolean;
  children: React.ReactNode;
  pageTitle?: string;
  siteData?: ISiteData;
}

export default function Layout({
  preview,
  pageTitle,
  siteData,
  children,
}: ILayout) {
  return (
    <StyledWrapper>
      <Wrapper pageTitle={pageTitle} siteData={siteData} />

      <main>{children}</main>

      <Footer />
    </StyledWrapper>
  );
}
