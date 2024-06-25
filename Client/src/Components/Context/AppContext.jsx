import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { setCookie } from "../ManageCookies";
import { useAuth0 } from "@auth0/auth0-react";

export const context = createContext();
const AppContext = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const footerRef = useRef(null);
  const [FooterDisplay, setFooterDisplay] = useState(true);
  const [NavDisplay, setNavDisplay] = useState(true);
  const [loginDone, setLoginDone] = useState(true);
  const [loginSuccessfull, setLoginSuccessfull] = useState(false);
  const [askUser, setAskUser] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});


  useLayoutEffect(() => {
    if (isAuthenticated) {
      setLoginDone(false);
      const checkUser = async (user) => {
        const res = await axios.post(
          `${import.meta.env.VITE_VIZIFY_BACKEND_USER}/checkbyemail`,
          user
        );

        return res.data;
      };
      checkUser(user)
        .then((res) => {

          if (!res.found) {
            if (res.isSocial) {
              setAskUser("Username");
            } else {
              setAskUser("Name");
            }
          } else {
            setLoggedInUser({...res.OneUser,isSocial: res.isSocial});
            setCookie("access_token",res.access_token,1)
            setLoginSuccessfull(true);
            setLoginDone(true);
          }
        })
        .catch((err) => {
          setLoginSuccessfull(false);
          setLoginDone(true);
          console.log(err);
        });
    }
  }, [isAuthenticated]);

  useLayoutEffect(() => {
    if (isLoading) {
      setLoginDone(false);
    } else if (!isLoading && !isAuthenticated) {
      setLoginDone(true);
      setLoginSuccessfull(false);
    }
  }, [isLoading]);

  useLayoutEffect(() => {
    if (loginSuccessfull) {
      setAskUser("");
    }
  }, [loginSuccessfull]);

  return (
    <context.Provider
      value={{
        footerRef,
        NavDisplay,
        setNavDisplay,
        FooterDisplay,
        setFooterDisplay,
        loginDone,
        loginSuccessfull,
        askUser,
        loggedInUser,
        setAskUser,
        setLoginDone,
        setLoginSuccessfull,
        setLoggedInUser,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default AppContext;
