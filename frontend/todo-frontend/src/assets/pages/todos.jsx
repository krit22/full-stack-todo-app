import {useState,useEffect,useRef} from 'react'
import axios from 'axios';

export function TodoPage(){

    const input=useRef();   
    const [todos,setTodos]=useState([]);

    useEffect(async function(){
        const response=await axios.get("http://localhost:3000/todo/all",{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        setTodos(response.data.todos);
    },[])

    return <>
        {/* {todos.map((m)=>{
            console.log(m.title)
        })} */}
        <div><input type="text" placeholder="Add a todo here" onChange={(e)=>{
            input.current=e.target.value;
        }}></input></div>
        <AddTodoButton/>
        <div><Todos/></div>
    </>

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
            {todos.map((e,i)=>(<TodoComponnent key={i} title={e.title} id/>))}
        
        </>

        function TodoComponnent({title}){
            return <div>{title}</div>
        }
    }
}


