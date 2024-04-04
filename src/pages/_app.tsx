import { AppProps } from "next/app";
import Navbar from "../components/navbar";
// import '../styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Navbar dark={true} /> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
