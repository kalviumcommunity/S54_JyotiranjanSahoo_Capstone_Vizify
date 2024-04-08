import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const context = createContext();
const AppContext = ({ children }) => {
  const footerRef = useRef(null);
  const [userData, setUserData] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [isSocialLogin,setIsSocialLogin] = useState(null)
  const options = {
    method: "POST",
    url: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/oauth/token`,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: import.meta.env.VITE_AUTH0_MANAGEMENT_CLIENT_ID,
      client_secret: import.meta.env.VITE_AUTH0_MANAGEMENT_CLIENT_SECRET,
      audience: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
    }),
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setAccessToken(response.data.access_token);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      }); 
  }, []);
  return (
    <context.Provider value={{ footerRef, userData, setUserData, accessToken,isSocialLogin,setIsSocialLogin }}>
      {children}
    </context.Provider>
  );
};

export default AppContext;
