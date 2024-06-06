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
        <Auth0Provider
          domain= {import.meta.env.VITE_AUTH0_DOMAIN}
          clientId= {import.meta.env.VITE_AUTH0_CLIENT_ID}
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
      <AppContext>
          <App />
      </AppContext>
        </Auth0Provider>
    </BrowserRouter>
  </ChakraProvider>
);
