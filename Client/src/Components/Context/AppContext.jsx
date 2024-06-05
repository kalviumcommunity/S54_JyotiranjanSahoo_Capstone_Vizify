import React, {
  createContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { setCookie } from "../ManageCookies";
import { useAuth0 } from "@auth0/auth0-react";

export const context = createContext();

const AppContext = ({ children }) => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const footerRef = useRef(null);
  const [NavDisplay, setNavDisplay] = useState(true);
  const [FooterDisplay, setFooterDisplay] = useState(true);
  const [loginDone, setLoginDone] = useState(true);
  const [loginSuccessfull, setLoginSuccessfull] = useState(false);
  const [askUser, setAskUser] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");

  useLayoutEffect(()=>{
    if(isAuthenticated){
        setLoginDone(false);
        const checkUser = async (user) =>{
            const res = await axios.post(`${import.meta.env.VITE_VIZIFY_BACKEND_USER}/checkbyemail`,user)
            
            return res.data
        }
        checkUser(user).then((res)=>{
            console.log(res);
            
            if(!res.found){
                if(res.isSocial){
                    setAskUser("Username")
                }else{
                    setAskUser("Name")
                }
            }else{
                setLoggedInUser(res.OneUser)
                setLoginSuccessfull(true)
                setCookie("Username",res.access_token,1)
                setLoginDone(true)
            }
            
        }).catch(err=>{
            setLoginSuccessfull(false)
            setLoginDone(true)
            console.log(err);
            
        })
    }
},[isAuthenticated])

useLayoutEffect(()=>{
  if(isLoading){
      setLoginDone(false)
  }else if(!isLoading && !isAuthenticated){
      setLoginDone(true)
      setLoginSuccessfull(false)
  }
},[isLoading])

useLayoutEffect(()=>{
  if(loginSuccessfull){
      setAskUser("")
  }
},[loginSuccessfull])
console.log(loggedInUser);


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
