import { ISiteData } from "../interfaces/site";
import Footer from "./global/footer";
import Wrapper from "./global/Wrapper";

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
    <>
      <Wrapper pageTitle={pageTitle} siteData={siteData} />

      <main>{children}</main>

      <Footer />
    </>
  );
}
