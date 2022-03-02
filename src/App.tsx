import React, { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { MyHome } from "./pages/home-automation";

const queryClient = new QueryClient();

const Providers: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>{children}</ChakraProvider>
  </QueryClientProvider>
);
const App: FC = () => (
  <Providers>
    <MyHome />
  </Providers>
);

export default App;
