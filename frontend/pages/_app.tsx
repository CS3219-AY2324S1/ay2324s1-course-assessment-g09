// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import IndexPage from "./assignment/IndexPage";
import Collaboration from "./collaboration";
// import "./index.css";
import "monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css"; // Import the global CSS file
import VideoCall from "../components/VideoCall";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      {/* <IndexPage /> */}
      {/* <Collaboration /> */}
      {/* <VideoCall /> */}
    </ChakraProvider>
  );
}

export default MyApp;
