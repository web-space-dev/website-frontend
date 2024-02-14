import { ISiteData } from "../interfaces/site";
import { darkerGrotesque } from "../styles/variables";
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

      <main className={darkerGrotesque.className}>{children}</main>

      <Footer />
    </>
  );
}
