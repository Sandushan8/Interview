import React from 'react'
import {Link} from 'react-router-dom'

//landing page
export const Landing = () => {
  return (
    <div>

    <div className='landingpage'>
      <div className='landingcontent'>
        <h1 className='landingtopic'>Track your ToDo's</h1><br/>
        <Link to='/register'><button className='buttonl'>Register</button></Link>
        <Link to='/login'><button className='buttonl'>Login</button></Link>
        </div>
    </div>
    </div>
  )
}
