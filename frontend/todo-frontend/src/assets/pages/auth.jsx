import {useState,useEffect,useRef} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";


export function Auth(){
    const [currentPage,setCurrentPage]=useState("register");
    const username=useRef();
    const password=useRef();
    const navigate=useNavigate();

    return <>
        <div>{currentPage}</div>
        <div><input type="text" placeholder="Username here" onChange={(e)=>{
            username.current=e.target.value;
        }} /></div>
        <div><input type="text" placeholder="Password here" onChange={(e)=>{
            password.current=e.target.value;
        }} /></div>
        <div>{currentPage==="login"?<SigninButton/>:<SignupButton/>}</div>
        <div>{currentPage==="login"?<SigninOption/>:<SignupOption/>}</div>
    </>



        function SignupButton(){
        return <>
            <button onClick={signUpHandler}>Sign Up</button>
        </>

        async function signUpHandler(){
            const res=await axios.post("http://localhost:3000/auth/signup",{
                username:username.current,
                password:password.current
            })
                alert(res.data.message)
                setCurrentPage("login")

        }
    }

    function SigninButton(){
        return <>
            <button onClick={signinhandler}>Sign In</button>
        </>

        async function signinhandler(req,res){

            res=await axios.post("http://localhost:3000/auth/signin",{
                username:username.current,
                password:password.current
            })

            alert(res.data.message)

            localStorage.setItem("token",res.data.token)
            if(res.data.status===1){
                console.log("redirecting to todos page...")
                navigate('./../todos')
            }
            
            
        }
    }

    function SigninOption(){
        return <>
            Not Signed up? Sign up <button onClick={()=>{
                setCurrentPage("signup")
            }}>here</button>
        </>
    }
    function SignupOption(){
        return <>
            Already Signed up? Sign in <button onClick={()=>{
                setCurrentPage("login")
            }}>here</button>    
        </>
    }
}


