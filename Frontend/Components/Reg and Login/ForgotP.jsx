import React,{useState} from 'react'
import axios from 'axios'
import { NavBar } from '../Navigation Bar/NavBar'

export const ForgotP = () => {
  const [email, setemail] = useState("")
	
//send email
  const submitform = async (e) =>{
    e.preventDefault()
    try{
      const {data} = await axios.post('http://localhost:3000/resetp',{email})
      alert(data.message)  
    }catch(error){

        alert("Error is "+error)

    }
  }
//get email from user and frontend input validation
  return (
    <div className='formpage'>
      <NavBar name ='Forgot password'/>
        
        <form className='form' onSubmit={submitform}>
        <h1>Forgot password</h1><br/>
        <label>Enter your email</label><br/>
        <input type='text' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title='Enter a valid email!' onChange={(e)=>setemail(e.target.value)} required/><br/><br/>
        
        <button className='submit'>Submit</button>
        </form>
    </div>
  )
}
