// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import IndexPage from "./assignment";
import Collaboration from "./collaboration";
// import "./index.css";
import "monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css"; // Import the global CSS file
import VideoCall from "../components/VideoCall";
import VideoChatComponent from "../components/VideoChatComponent";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ChakraProvider>
      {/* <Component {...pageProps} /> */}
      {/* <IndexPage /> */}
      {/* <Collaboration /> */}
      {/* <VideoCall /> */}
      <VideoChatComponent />
    </ChakraProvider>
  );
}

export default MyApp;
