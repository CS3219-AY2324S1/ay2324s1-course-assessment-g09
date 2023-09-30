// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import IndexPage from ".";
import Collaboration from "./collaboration";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <IndexPage />
      {/* <Collaboration /> */}
    </ChakraProvider>
  );
}

export default MyApp;
