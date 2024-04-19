import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { setCookie } from "../ManageCookies";

export const context = createContext();
const AppContext = ({ children }) => {
  const footerRef = useRef(null);
  const [NavDisplay, setNavDisplay] = useState(true);
  const [loginSuccessful,setLoginSuccessful] = useState(false)
  const [FooterDisplay, setFooterDisplay] = useState(true);
  const [isSocialLogin, setIsSocialLogin] = useState(null);
  const [userData, setUserData] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [loginDone, setLoginDone] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});
  const [username,setUsername] = useState('')

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return jsonPayload;
}
  useEffect(() => {
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
    axios
      .request(options)
      .then(function (response) {
        setAccessToken(response.data.access_token);
      })
      .catch(function (error) {
        console.error(error);
      });

    axios
      .get(import.meta.env.VITE_VIZIFY_BACKEND_USER)
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (userId != "" && loginDone) {
      axios
        .get(`${import.meta.env.VITE_VIZIFY_BACKEND_USER}/${userId}`)
        .then((res) => {
          setLoggedInUser(res.data.User);
          
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);
  useEffect(()=>{
    if(Object.keys(loggedInUser).length != 0){
      setCookie("username",loggedInUser.Username,1)
      setUsername(parseJwt(loggedInUser.Username))
    }
  },[loggedInUser])


  return (
    <context.Provider
      value={{
        footerRef,
        userData,
        setUserData,
        accessToken,
        isSocialLogin,
        setIsSocialLogin,
        NavDisplay,
        setNavDisplay,
        FooterDisplay,
        setFooterDisplay,
        loginDone,
        setLoginDone,
        allUsers,
        setAllUsers,
        userId,
        setUserId,
        loggedInUser,
        setLoggedInUser,
        loginSuccessful,
        setLoginSuccessful,
        username
      }}
    >
      {children}
    </context.Provider>
  );
};

export default AppContext;
