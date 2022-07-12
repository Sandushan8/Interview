import React, {useState} from 'react'
import axios from 'axios'
import { NavBar } from '../Navigation Bar/NavBar'
import {useNavigate} from 'react-router-dom'
export const AddToDo = () => {
  const [task,setTask] = useState('')
  const [date,setDate] = useState('')
  const [time,setTime] = useState('')
  const navigate = useNavigate()
  //post to do into database
  const submitform = async (e) =>{ 
    e.preventDefault()
    let result = await axios.post('http://localhost:3000/todo',{task:task,date:date,time:time})
    if(result){
    alert('Successfully Added!')
      navigate('/main')
    }
  }
  
  //get input from user
  return (
    <div className='formpage'>
      <NavBar name='Add New Task'/>
        <form className='form' onSubmit={submitform}>
            <h1 className='topic'>Add New Task</h1><br/>
            <label>Task</label><br/>
            <input type = 'text' onChange={(e)=>setTask(e.target.value)} required/><br/><br/>
            <label>Date</label><br/>
            <input type = 'date' onChange={(e)=>setDate(e.target.value)} required/><br/><br/>
            <label>Time</label><br/>
            <input type = 'time' onChange={(e)=>setTime(e.target.value)} required/><br/><br/>
            <button className='submit'>Submit</button>
            
        </form>
    </div>
  )
}
