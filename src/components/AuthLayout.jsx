import React, {useEffect,useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Here we are thinking that user will send authentication but we can make the application that we dont rely on user to send it and we do it on our own on basis of authStatus but it wont be this good in validation
export default  function Protected({children, authentication=true}){

    const navigate= useNavigate()
    const [loader, setLoader]= useState(true)
    const authStatus= useSelector(state=> state.auth.status)


    useEffect(()=>{
        if(authentication && authStatus !== authentication){  //This checks that user is not logged in
            navigate("/login")
        }
        else if(!authentication && authStatus !== authentication){    //This checks if user is logged in
            navigate("/")
        }

        setLoader(false)
    },[authStatus,navigate, authentication])

    return loader? <h1>Loading...</h1> : <>{children}</>
}
