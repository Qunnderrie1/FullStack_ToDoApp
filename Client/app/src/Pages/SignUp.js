import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom';

const SignUp = () => {

    const [userData , setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [username,  setUserName ] = useState('')
    const [email,  setEmail ] = useState('')
    const [password,  setPassword ] = useState('')

    const navigate = useNavigate();


    const handleSubmit = (e) => {

        e.preventDefault();
    }

    const handleChange = (e) => {

        setUserData({...userData ,[ e.target.id] : e.target.value})



    }

    const handleSignUp = async () =>{


        try {


           const res = await axios.post('/api/user/signup',
                {
                   username: username,
                    email: email,
                    password: password
                })
                .then((res) => console.log(res.data) )
                .catch((err) => console.log(err) )
    
                navigate('/')
  
        } catch (error) {

            console.log(error)
        }

    }


  return (

    <div className='siginContainer container'>
        <h1>Sign Up</h1>
        <p>Sign Up to get started</p>
        <form className='signUpForm' onSubmit={handleSubmit}>
            <input onChange={(e) => setUserName(e.target.value)} value={username}  className='form-control' placeholder='username' />
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='form-control' type='email' placeholder='email' />
            <input onChange={(e) => setPassword(e.target.value)} value={password}   className='form-control' placeholder='password' />
            <button onClick={handleSignUp}>Sign Up</button>
        </form>
        <div className='signUpBottomContainer'>
            <p>Back to</p>
           <Link to='/'>Login</Link>
        </div>

    </div>
  )
}

export default SignUp