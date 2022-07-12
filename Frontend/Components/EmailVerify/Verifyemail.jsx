import React, {useState,useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import { NavBar } from '../Navigation Bar/NavBar'



export const Verifyemail = () => {
    const [valid,setvalid] = useState(true)
    const param = useParams()

    //verifying the email
    useEffect(()=>{
        const verifyE= async () => {
			try {
				const url = `http://localhost:3000/user/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				if(data.message == 'success'){
                alert('Email Verified!')
				setvalid(true)}
                else{
                    setvalid(false)
                    alert(data.message)
                }
			} catch (error) {
				alert(error)
				setvalid(false)
			}
		}
        verifyE()
    },[param])
//if email is verified
if(valid){
  return (
    <div>
            <div className='formpage'>
                <NavBar name='Verifying'/>
                <div className='form'>
                <h1> Verification Successfull! {valid}</h1><br/>
                <Link to='/login'><button className='submit'>Login</button></Link>
                </div>
            </div>
    </div>
  )
}else{
    return(
        <div>
            <h1>404 Error</h1>
        </div>
    )
}

}
