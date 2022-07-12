import React from "react";
import ReactDom from  'react-dom'
import './App.css'
import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import { Landing } from "./Components/Reg and Login/Landing";
import { Main } from "./Components/ToDo/Main";
import { Login } from "./Components/Reg and Login/Login";
import { Registration } from "./Components/Reg and Login/Registration";
import { ForgotP } from "./Components/Reg and Login/ForgotP";
import { AddToDo } from "./Components/ToDo/AddToDo";
import { UpdateToDo } from "./Components/ToDo/UpdateToDo";
import { Viewuser } from "./Components/User/viewuser";
import { ChangeP } from "./Components/User/changepassword";
import { Verifyemail } from "./Components/EmailVerify/Verifyemail";
import { ResetPassword } from "./Components/ResetPassword/ResetPassword";


export const App=()=>{
    const user = localStorage.getItem('token')

    return(
        <div>
           <BrowserRouter>
           <Routes>
            <Route exact path='/' element={<Landing/>}/>
            {user && <Route exact path='/main' element={<Main/>}/>}
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/register' element={<Registration/>}/>
            <Route exact path='/forgotp' element={<ForgotP/>}/>
            {user && <Route exact path='/addtodo' element={<AddToDo/>}/>}
            {user && <Route exact path='/updatetodo' element={<UpdateToDo/>}/>}
            {user && <Route exact path='/viewuser' element={<Viewuser/>}/>}
            {user && <Route exact path='/changep' element={<ChangeP/>}/>}
            <Route exact path='/user/:id/verify/:token' element={<Verifyemail/>}/>
            <Route exact path='/passreset/:id/:token' element={<ResetPassword/>}/>
            <Route exact path='/main' element={<Navigate replace to='/'/>}/>
           </Routes>
           </BrowserRouter>
        </div>
    )
}

ReactDom.render(<App/>, document.getElementById('root'))