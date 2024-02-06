import { ISiteData } from "../interfaces/site";
import Alert from "./alert";
import Footer from "./global/footer";
import Wrapper from "./global/Wrapper";
import Meta from "./meta";

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

      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
