// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import IndexPage from ".";
import Collaboration from "./collaboration";
import "./index.css";
import "monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css"; // Import the global CSS file

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      {/* <IndexPage /> */}
      {/* <Collaboration /> */}
    </ChakraProvider>
  );
}

export default MyApp;
