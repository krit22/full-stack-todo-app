import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Auth } from "./assets/pages/auth.jsx";
import { TodoPage } from "./assets/pages/todos.jsx";

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/todos" element={<TodoPage/>}></Route>
        </Routes>
      </BrowserRouter>    
    </>
  )

}
  function Home(){
    return <div>hi</div>
}


export default App
