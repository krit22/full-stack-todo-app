import {useState,useEffect,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './todos.css'


export function TodoPage(){
    const navigate=useNavigate();
    const input=useRef();   
    const [todos,setTodos]=useState([]);

    useEffect(function(){
        async function test() {
             const response=await axios.get("https://full-stack-todo-app-mdfk.onrender.com/todo/all",{
             headers:{
                    token:localStorage.getItem("token")
                }
            })
        setTodos(response.data.todos);
        }
        test();
    },[])


    return <>

        <LogoutButton/>
        <div className='container1'>
            <div className='heading'>Your todos</div>
            <Todos/>
            <div className='todo-container'>
                <div><input className='inputBox1' type="text" placeholder="Add a todo here" onChange={(e)=>{
                    input.current=e.target.value;
                }}></input></div>

                <AddTodoButton/>
            </div>
        </div>
    </>

    // return <>
       
        // <div><input type="text" placeholder="Add a todo here" onChange={(e)=>{

        //     input.current=e.target.value;
        // }}></input></div>
        // <AddTodoButton/>
    //     <LogoutButton/>
    //     <div><Todos/></div>
    // </>

    function LogoutButton(){
        return <>
            <div className='logout-container'>
                
                <button className='button1' onClick={()=>{
                    localStorage.setItem('token',"")
                    navigate("/auth")
                }}>Logout</button>
            </div>
        </>
    }

    function AddTodoButton(){
        return <>
            <button className='button1' onClick={addTodoHandler}>Add a todo</button>
        </>

        async function addTodoHandler(){
            try{
                await axios.post("https://full-stack-todo-app-mdfk.onrender.com/todo/add",{
                    title:input.current,
                    description:"default",
                },{
                    headers:{
                        token:localStorage.getItem('token')
                    }
                })


                //

                const response=await axios.get("https://full-stack-todo-app-mdfk.onrender.com/todo/all",{
                headers:{
                 token:localStorage.getItem("token")
                }
            })
            setTodos(response.data.todos);


                
            }catch(e){
                console.log("An error occured trying to add todo ")
            }

        }
    }

    function Todos(){
        return <>
            {todos.map((e,i)=>(<TodoComponnent key={i} title={e.title} _id={e._id} />))}
        </>

        function TodoComponnent({title,_id}){
            return <>
                <div className='todo-container'>
                    <span>{title}</span>
                    <span><DeleteButton id={_id} /></span>
                </div>
            </>

            function DeleteButton({id}){
                return <button className='button1' onClick={deleteHandler}>Delete</button>
            
                async function deleteHandler(){
                await axios.post('https://full-stack-todo-app-mdfk.onrender.com/todo/delete',{
                    idToDelete:id
                },{
                    headers:{
                        token:localStorage.getItem("token")
                    }
                })

                const response=await axios.get("https://full-stack-todo-app-mdfk.onrender.com/todo/all",{
             headers:{
                    token:localStorage.getItem("token")
                }
            })
            setTodos(response.data.todos);                

            }
            
        }

            
        }
    }
}


