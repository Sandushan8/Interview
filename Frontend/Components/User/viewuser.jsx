import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { NavBar } from '../Navigation Bar/NavBar'
import { Link } from 'react-router-dom'
import imgg from '../../Img/vector-designer-work-station-illustration.jpg'
export const Viewuser = () => {
    const [apidata,setdata] = useState('')
    const [email] = useState(localStorage.getItem('uemail'))
    
    //fetch user details
    useEffect(()=>{
        axios.get(`http://localhost:3000/user/${email}`).then(getdata=>{
                setdata(getdata.data)})
    },[])
    


    
  //show user details
  return (
    <div className='formpage'>
        <NavBar name = "User Details"/>
        <div className='form'>
        <h1 className='topic'>User Details</h1>
        <br/>
        <img src={imgg} width='200' height='150'/><br/><br/>
        <h3>User Name</h3><br/>
        <h4>{apidata.name}</h4> <br/>
        <h3>Email</h3> <br/>
        <h4>{apidata.email}</h4><br/>
        <h3>Contact</h3> <br/>
        <h4>{apidata.contact}</h4><br/>
        <Link to='/changep'><button className='submitc'>Change password</button></Link>
        </div>
    </div>
  )
}
