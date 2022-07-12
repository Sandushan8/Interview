import React, {useState} from 'react'
import axios from 'axios'
import { NavBar } from '../Navigation Bar/NavBar'


export const Registration = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [contact,setContact] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  
  //send registered details to backend
  const submitform = async (e) =>{ 
    e.preventDefault()
    const {data:res} = await axios.post('http://localhost:3000/user',{name:name,email:email,contact:contact,password:password})
    setError(res.message)
    if(res.message != 'User exists'){
    alert(res.message)
    window.location = '/login'
    }
  }

  
//get registration details and validation
  return (
    <div className='formpage'>
      <NavBar name='Register'/>
        <form className='form' onSubmit={submitform}>
            <h1 className='topic'>Register</h1><br/>
            <label>Name</label><br/>
            <input type = 'text' placeholder='example' onChange={(e)=>setName(e.target.value)} required/><br/><br/>
            <label>Email</label><br/>
            <input type = 'text' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder='example@gmail.com' title='example@gmail.com' onChange={(e)=>setEmail(e.target.value)} required/><br/><br/>
            <label>Contact</label><br/>
            <input type = 'tel' maxLength={10} pattern="(?<!\d)\d{10}(?!\d)" placeholder='0123456789' title='Ten Digit Number Ex:0123456789' onChange={(e)=>setContact(e.target.value)} required/><br/><br/>
            <label>Password</label><br/>
            <input type = 'password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={(e)=>setPassword(e.target.value)} required title='Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'/>
            <br/><br/>
            {error && <div className='error'>{error}</div>}
            <br/><button className='submit'>Submit</button>
   
        </form>
    </div>
  )
}
