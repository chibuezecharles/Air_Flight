import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='notfound'> 
      <h4>Page Not Found, Please go back to  <Link to='/'> <span> Login</span> </Link></h4>
    </div>
  )
}

export default NotFound