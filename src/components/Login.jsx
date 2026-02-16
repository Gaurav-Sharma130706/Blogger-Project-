import React , {useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import { login as authLogin } from "../store/authSlice";
import {Button, Input, Logo} from './index'
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.service";
import { useForm } from "react-hook-form";

function Login(){
    const navigate= useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}= useForm()           //It is refered from documentation
    const [error,setError]= useState("")

    const login =async(data)=>{
        setError("")   //We are emptying out the errors as soon as we login
        
        try {
            const session = await authService.login(data)

            if(session){
                const userData= await authService.getCurrentUser()               //yaad rakhiyega ki userData await use karke hi niklega kyunkki usse apan getCurrent user method se nikal rahe hain
                if(userData) dispatch(authLogin(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return(
         <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>

             <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}  {/* Conditionaly render the errors*/}

        {/* apan directly onsubmit mai login use nhi karte hain but instead handle submit ke andar use karte hain because jo username, password wala data hai jo apan apne login fnc mai input lere hain it comes through handle submit with help of register */}
        <form onSubmit={handleSubmit(login)} className="mt-8">  {/*Handle submit apna react hook form se aaya hai usme apan apna defined function daalte hain to handle the submission proccess */}
            <div className="space-y-5">

                {/* input field for our Email in our form now we have to do repetative work to make input for password ,etc*/}
                {/*yeh register bhi react hook form se aaya hai and ... use karna is important kyunki agar aap kisi aur Input mai bhi register use karte ho toh uski value overwrite ho jayegi , register mai (email) daal nai ka matlab this input is for Email*/}
                <Input 
                label='Email: '
                placeholder="Enter your Email"
                type= "email"
                {...register("email",{      /*Yeh apne react hook form se related hai therefore we can refer to its documentation to understand key joki apan ne "email di hai uske baad wale options are optional"  */
                    required: true,
                    validate:{
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||"Email address must be valid"
                                                /*It is the regex for email validation if the value provided matches it it is accepted otherwise msg displayed */
                    }
                })}>   
                
                </Input>

                <Input
                label="Password"
                placeholder="Enter your password"
                type= "password"
                {...register("password",{
                    required:true,
                     
                })}/>

                <Button type="submit" className="w-full">Sign In</Button>
            </div>
        </form>
            </div>
        </div>
    )
}

export default Login