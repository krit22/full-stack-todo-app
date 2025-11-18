import {useState,useEffect,useRef} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import './auth.css'

export function Auth(){
    const [currentPage,setCurrentPage]=useState("register");
    const username=useRef();
    const password=useRef();
    const navigate=useNavigate();

    

    return <>
        <div className="container">
            <div className="heading">{currentPage}</div>
            <div><input className="inputBox" type="text" placeholder="Username here" onChange={(e)=>{
            username.current=e.target.value;
            }} /></div>

            <div><input className="inputBox" type="text" placeholder="Password here" onChange={(e)=>{
            password.current=e.target.value;
            }} /></div>

            <div>{currentPage==="login"?<SigninButton/>:<SignupButton/>}</div>
            <div>{currentPage==="login"?<SigninOption/>:<SignupOption/>}</div>
        </div>
        
    </>





        function SignupButton(){
        return <>
            <button className="button" onClick={signUpHandler}>Sign Up</button>
        </>

        async function signUpHandler(){
            const res=await axios.post("https://full-stack-todo-app-mdfk.onrender.com/auth/signup",{
                username:username.current,
                password:password.current
            })
                alert(res.data.message)
                setCurrentPage("login")

        }
    }

    function SigninButton(){
        return <>
            <button className="button" onClick={signinhandler}>Sign In</button>
        </>

        async function signinhandler(req,res){

            res=await axios.post("https://full-stack-todo-app-mdfk.onrender.com/auth/signin",{
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
            <div className="lastDiv">
                Not Signed up? Sign up <button className="button2" onClick={()=>{
                    setCurrentPage("signup")
                }}>here</button>
            </div>
        </>
    }
    function SignupOption(){
        return <>
            <div className="lastDiv">
                Already Signed up? Sign in <button className="button2" onClick={()=>{
                    setCurrentPage("login")
                }}>here</button>    
            </div>
        </>
    }
}


