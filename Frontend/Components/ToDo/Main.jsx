import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { NavBar } from '../Navigation Bar/NavBar'
export const Main = () => {
  const [apiData,setData] = useState([])
  const [highlight,setHighlight] = useState(0)

  //get today date. Slice used to get the correct format for if condition
  const today = new Date()
  const date = `${today.getFullYear()}-${('0'+(today.getMonth()+1)).slice(-2)}-${('0'+today.getDate()).slice(-2)}`

  //get all todos from database
  useEffect(()=>{
    axios.get('http://localhost:3000/todo').then(getdata=>{
      setData(getdata.data)
    })
  },[])
  
  ///toggle highlight today todo's
  const hlight = () =>{
    if(highlight==0){
    setHighlight(1)
    }else{
      setHighlight(0)
    }
  }
  //set id for update
  const setID = (id) =>{
    localStorage.setItem('ID',id)
  }
  //delete todo's
  const deletetask = async (id) =>{
    await axios.delete(`http://localhost:3000/todo/${id}`)
    .then(window.location.reload()).then(alert('Successfully deleted!'))
  }
  //sort todo's by date and time
  const sortData = () =>{
    let sorttime = [].concat(apiData)
    .sort((a,b) => a.time<b.time ? 1:-1)

    const sortdate = [].concat(sorttime).sort((a,b) => a.date>b.date ? 1:-1)
    setData(sortdate)
  }

  //todo main page
  return (
    <div className='todopage'>
        <NavBar name='To Do List'/>
        <div className='todolist'>
        <h1 className='topic'>To Do List</h1>
        <Link to='/addtodo'><button className='todoaddb'>Add New Task</button></Link>
        <button className='todohlb' onClick={hlight}>Highlight today tasks</button>
        <button className='todosort' onClick={sortData}>Sort by Asc</button>
            {apiData.map((data)=>{
              //highlight today task
              if(highlight){
              //if date = today date change background color
              if(data.date == date){
                return(
                  <div className='highlight' key={data._id}>
                    <ul>
                    <li>{data.task}</li>
                    <li>{data.date+' at '+data.time}</li> 
                    </ul>
                    <Link to='/updatetodo'><button className='updateb' onClick={()=>setID(data._id)}>Update</button></Link>
                    <button className='deleteb' onClick={()=>deletetask(data._id)}>Delete</button>
                  </div>
                )
              }

              else{
                //if date!=today date return normally
              return(
               
                    <div className='nohighlight' key={data._id}>
                    <ul>
                    <li>{data.task}</li>
                    <li>{data.date+' at '+data.time}</li>
                    
                    </ul>
                    <Link to='/updatetodo'><button className='updateb' onClick={()=>setID(data._id)}>Update</button></Link>
                    <button className='deleteb' onClick={()=>deletetask(data._id)}>Delete</button>
                    </div>
                  
              )}}

              //if highlight is not called return normally
              return(
                    <div className='nohighlight' key={data._id}>
                    <ul>
                    <li>{data.task}</li>
                    <li>{data.date+' at '+data.time}</li>
                    </ul>
                    <Link to='/updatetodo'><button className='updateb' onClick={()=>setID(data._id)}>Update</button></Link>
                    <button className='deleteb' onClick={()=>deletetask(data._id)}>Delete</button>
                    </div>  
              ) 
            })}
            </div>


          
    </div>
  )
}
