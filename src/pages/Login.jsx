import React, { useState } from 'react';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';


 
const Login = () => {
 
  const [email, setEmail] =   useState("");
  const [password, setPassword] = useState("");
  const [isloading, setLoading] = useState(false);

  const myEmail = "chuma6619@gmail.com";
  const myPassword = "123456";

  const navigation = useNavigate();

  const handleLogin = (e) =>{
    e.preventDefault();

    setLoading(true);
    if(email === myEmail && password === myPassword){
      setLoading(false);
      navigation('/dashboard/arriveflights');
     
    }else{
      alert("Incorrect Login Details");
      setLoading(false);
      setEmail("");
      setPassword("");
      navigation('/');

    }
  }

  
  return (
    <>
      <div className='login_container'>
        <div className="logo_container">
          <div className='logo'> 
            <h2><Link to={'/'}>Chillycee Air</Link></h2>
          </div>
          <div className="loginBtn">
            <Link to={'/'}>Login</Link>
          </div>
        </div>

        <div className="main_container">
          <div className="login_text">
            <h1>Life Is Short And The World is Alive!</h1>
            <p>
              To get the best of your adventure you just need to leave
              and go where you like, we are waiting for you.
            </p>
          </div>

          <div className='login_section2'>
            <form  className='form_container' onSubmit={handleLogin}>
              <div className='text_common'>
                <TextField 
                  required
                  id='email'
                  label="Email"
                  type='email'
                  placeholder='enter your email address'
                  fullWidth
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
                  InputProps={{ style: {color: '#4f3f84', } }}
                  
                  sx={{
                    "& .MuiInputLabel-root": {color: '#4f3f84'},
                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f3f84'},
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#FF662A" },
                    },

                    "& .MuiOutlinedInput-root:hover": {
                      "& fieldset": { borderColor: "#FF662A" },
                    },

                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& fieldset": { borderColor: "#FF662A" },
                    },

                  }}
                />
              </div>

              <div className='text_common'>
                <TextField 
                    required
                    id='password'
                    label="Password"
                    type='password'
                    placeholder="enter your password"
                    fullWidth
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    InputProps={{ style: {color: '#4f3f84',} }}
                    sx={{
                      "& .MuiInputLabel-root": {color: '#4f3f84'},
                      "& .MuiInputLabel-root.Mui-focused": {color: '#4f3f84'},
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#FF662A" },
                      },
    
                      "& .MuiOutlinedInput-root:hover": {
                        "& fieldset": { borderColor: "#FF662A" },
                      },
    
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& fieldset": { borderColor: "#FF662A" },
                      },
    
                    
                    }}
                />
              </div>

              <div className='login_btn_container'>
                {
                  isloading? ( <button className='login_btn'>Loading...</button>) :
                  (<button className='login_btn' >Login</button>)
                }
                
              </div>
            </form>
          </div>
        </div>
      </div>  
    </>
  )
}

export default Login;