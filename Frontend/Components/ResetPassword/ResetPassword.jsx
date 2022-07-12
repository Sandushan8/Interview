import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { NavBar } from '../Navigation Bar/NavBar'

export const ResetPassword = () => {
    const [valid, setValid] = useState(false)
	const [password, setPassword] = useState("")
	const param = useParams();

    useEffect(()=>{
    //verify the link
		const verify = async () => {
			try {
				const {data} = await axios.get(`http://localhost:3000/resetp/${param.id}/${param.token}`)
                if(data.message == 'success'){
				setValid(true)
                }
			} catch (error) {
				setValid(false)
			}
		};
		verify();
	}, [param])
    //submit the new password
    const submitform = async (e)=>{
        e.preventDefault()
        try {
            const {data} = await axios.post(`http://localhost:3000/resetp/${param.id}/${param.token}`,{password})
            alert(data.message)
            window.location = '/login'
        } catch (error) {
            alert(error)
        }
    }
//if link is verified get new password from user
if(valid){
  return (
    <div>
        <div className='formpage'>
            <NavBar name='New Password'/>
            <form className='form' onSubmit={submitform}>
                <h1>Enter new password</h1><br/>
                <input type = 'password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={(e)=>setPassword(e.target.value)} required title='Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'/>
                <br/><br/><button className='submit'>submit</button>
            </form>
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
    //if not return error page
}
