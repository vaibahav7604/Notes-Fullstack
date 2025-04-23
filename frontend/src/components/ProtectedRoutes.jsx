import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import {ACCESS_TOKEN,REFRESH_TOKEN} from "../constants";
import { useState, useEffect } from "react";


export default function ProtectedRoutes({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {   
        auth().catch(()=> setIsAuthorized(false));
        // This function is called when the component mounts. It checks if the user is authenticated or not.
    },[])



    const refrenceToken=async()=>{
        // This function refrece the token automatically when it expires.
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        // The refresh token is used to obtain a new access token when the current one expires.
        // It is stored in local storage and retrieved when needed.
        try {
            const res=await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if(res.status===200){
                localStorage.setItem(ACCESS_TOKEN,res.data.access);
                setIsAuthorized(true);
            }
            else{
                setIsAuthorized(false);
            }
            // The response is checked for a 200 status code, indicating success.
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }

    }
     

    const auth=async()=>{
        // This function checks if the user is authenticated or not.
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(!token){
            setIsAuthorized(false);
            return;
        }
        const decodedToken = jwtDecode(token);
        const tokenExpiration = decodedToken.exp; 
        const now= Date.now() / 1000; // Convert to milliseconds  
        // The token is decoded to extract the expiration time, which is compared to the current time.
        // If the token is expired, the refreshToken function is called to obtain a new one. 
        if(tokenExpiration<now){
            await refrenceToken();

        } 
        else{
            setIsAuthorized(true);
        }

    }
    if(isAuthorized===null){
        return<div>Loading...</div>
    }
    return isAuthorized ? children : <Navigate to="/login" />;
}
