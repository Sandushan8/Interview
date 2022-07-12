import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { NavBar } from '../Navigation Bar/NavBar'

export const ChangeP = () => {
    const [newp,setNewP] = useState('')
    const [email] = useState(localStorage.getItem('uemail'))
//updated password is passed
    const submitpass = async (e) =>{
        e.preventDefault()
        const {data:res} = await axios.patch(`http://localhost:3000/user/${email}`,{password:newp})
        if(res.message){
            alert('Updated Successfully')
            window.location = '/viewuser'
        }else{
            alert('Updation failed')
        }
    }
    //get password
  return (
    <div className='formpage'>
        <NavBar name = "Change Password"/>
        <div className='form'>
        <h1>Enter New Password</h1><br/>
        <form onSubmit={submitpass}>
        <input type = 'password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={(e)=>setNewP(e.target.value)} required title='Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'/>
        <br/><br/>
        <button className='submit'>Change</button>
        </form>
        </div>
    </div>
  )
}