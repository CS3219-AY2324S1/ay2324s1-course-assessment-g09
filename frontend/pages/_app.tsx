// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import IndexPage from ".";
import Collaboration from "./collaboration";
import "./index.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      {/* <IndexPage /> */}
      {/* <Collaboration /> */}
    </ChakraProvider>
  );
}

export default MyApp;
