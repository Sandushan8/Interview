import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { NavBar } from '../Navigation Bar/NavBar'
import {useNavigate} from 'react-router-dom'

export const UpdateToDo = () => {

  const [id,setid] = useState(0)
  const [task,setTask] = useState('')
  const [date,setDate] = useState('')
  const [time,setTime] = useState('')
  const navigate = useNavigate()

  //fetch todo id from local storage
  useEffect(()=>{
    setid(localStorage.getItem('ID'))
    
  },[])
  //send updated todo to database
  const updateform = async (e) =>{
    e.preventDefault()
    let result = await axios.put(`http://localhost:3000/todo/${id}`,{task:task,date:date,time:time})
    if(result){
    alert('Successfully updated!')
    navigate('/main')
    }
    
  }
  
  //get user inputs for update
  return (
    <div className='formpage'>
      <NavBar name='Update Task'/>
      <div className='form'>
        <form onSubmit={updateform}>
            <h1 className='topic'>Update Task</h1><br/>
            <label>Task</label><br/>
            <input type = 'text' onChange={(e)=>setTask(e.target.value)} required/><br/><br/>
            <label>Date</label><br/>
            <input type = 'date' onChange={(e)=>setDate(e.target.value)} required/><br/><br/>
            <label>Time</label><br/>
            <input type = 'time' onChange={(e)=>setTime(e.target.value)} required/><br/><br/>
            <button className='submit'>Submit</button>
        </form>
        </div>
    </div>
  )
}




