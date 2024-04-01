import { AppProps } from "next/app";
import Navbar from "../components/navbar";
// import '../styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar dark={false} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
