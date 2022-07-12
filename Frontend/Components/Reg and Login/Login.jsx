import axios from 'axios'
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { NavBar } from '../Navigation Bar/NavBar'

export const Login = () => {
  const [email,setemail] = useState('')
  const [password,setpassword] = useState('')

  //authorize user for log in
  const submitform = async (e)=>{
    e.preventDefault()
    localStorage.setItem("uemail",email)
    try{
      const {data : res} = await axios.post('http://localhost:3000/auth/userauth',{email:email,password:password})
      localStorage.setItem("token", res.data)
      alert(res.message)
      if(res.data){
      window.location = '/main'
      }
      
    }catch(error){
      console.log(error)
    }
  }
  //get log in details
  return (
    <div className='formpage'>
        <NavBar name='Login'/>
        <form className='form' onSubmit={submitform}>
          <h1 className='topic'>Login</h1><br/>
            <label>Email</label><br/>
            <input type='text' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title='Enter a valid email!' onChange={(e)=>setemail(e.target.value)} required/><br/><br/>
            <label>Password</label><br/>
            <input type='password' onChange={(e)=>setpassword(e.target.value)} required/><br/><br/>
            <button className='submit'>Login</button><br/><br/>
            <Link to='/forgotp'><label className='forgotp'>Forgot password?</label></Link>
        </form>
    </div>
  )
}
