import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = (props) => {
    //if to do list return below
    if(props.name == 'To Do List'){
        const logout = () =>{
            localStorage.removeItem('uemail')
            localStorage.removeItem('token')
            window.location.reload()
        }
        return(
            <div className='nav'>
        <nav className='Adnav'>
            <label className='alogo'>{props.name}</label>
        <ul className='navul'>
            <Link to='/viewuser'><li className='navli'>View User Details</li></Link>
            <li className='navli' onClick={logout}>Log Out</li>
        </ul>
        </nav>
        </div>
        )
    }
    //else return below
    else{
    return (
    <div className='nav'>
        <nav className='Adnav'>
            <label className='alogo'>{props.name}</label>
        </nav>
    </div>
    )}
  
}
