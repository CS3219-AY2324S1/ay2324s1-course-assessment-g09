// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import IndexPage from ".";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (

    <ChakraProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
