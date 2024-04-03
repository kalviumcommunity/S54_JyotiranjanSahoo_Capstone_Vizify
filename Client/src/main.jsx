import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./Components/Context/AppContext.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <BrowserRouter>
      <AppContext>
        <Auth0Provider
          domain="devjyoti.us.auth0.com"
          clientId="PmdE3A196JDFgXYCdqA6X0HLy61GZSjL"
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <App />
        </Auth0Provider>
      </AppContext>
    </BrowserRouter>
  </ChakraProvider>
);
