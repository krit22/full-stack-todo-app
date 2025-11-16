import {useState,useEffect,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export function TodoPage(){
    const navigate=useNavigate();
    const input=useRef();   
    const [todos,setTodos]=useState([]);

    useEffect(function(){
        async function test() {
             const response=await axios.get("http://localhost:3000/todo/all",{
             headers:{
                    token:localStorage.getItem("token")
                }
            })
        setTodos(response.data.todos);
        }
        test();
    },[])

    return <>
       
        <div><input type="text" placeholder="Add a todo here" onChange={(e)=>{
            input.current=e.target.value;
        }}></input></div>
        <AddTodoButton/>
        <LogoutButton/>
        <div><Todos/></div>
    </>

    function LogoutButton(){
        return <>
            <button onClick={()=>{
                localStorage.setItem('token',"")
                navigate("/auth")
            }}>Logout</button>

        </>
    }

    function AddTodoButton(){
        return <>
            <button onClick={addTodoHandler}>Add a todo</button>
        </>

        async function addTodoHandler(){
            try{
                await axios.post("http://localhost:3000/todo/add",{
                    title:input.current,
                    description:"default",
                },{
                    headers:{
                        token:localStorage.getItem('token')
                    }
                })


                //

                const response=await axios.get("http://localhost:3000/todo/all",{
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
                <div>
                    <span>{title}</span>
                    <span><DeleteButton id={_id} /></span>
                </div>
            </>

            function DeleteButton({id}){
                return <button onClick={deleteHandler}>Delete</button>
            
                async function deleteHandler(){
                await axios.post('http://localhost:3000/todo/delete',{
                    idToDelete:id
                },{
                    headers:{
                        token:localStorage.getItem("token")
                    }
                })
            }
            
        }

            
        }
    }
}


