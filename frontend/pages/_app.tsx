// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import IndexPage from ".";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <IndexPage />
    </ChakraProvider>
  );
}

export default MyApp;
