import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate , Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart } from '../features/userSlice';



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

    const { isError } = useSelector( state => state.user)
    const dispatch = useDispatch();


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
                
                dispatch(signInStart())
                navigate('/')
                
  
        } catch (error) {

            console.log(error)
        }

    }


  return (

    <div className='siginContainer container'>
        <h1 className="appLogoText">To-Do <span>List</span></h1>

        <h1>Sign Up</h1>
        <p>Create an account to start creating tasks</p>
        <form className='signUpForm' onSubmit={handleSubmit}>
            <input onChange={(e) => setUserName(e.target.value)} value={username}  className='form-control' type='text' minLength='0' maxLength="30" placeholder='username' />
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='form-control' type='text' placeholder='email' />
            <input onChange={(e) => setPassword(e.target.value)} value={password}   className='form-control' type='password' minLength='0' maxLength="10" placeholder='password' />
            <button onClick={handleSignUp}>Sign Up</button>
        </form>
        <div className='signUpBottomContainer'>
            <p>Back to</p>
           <Link to='/'>Login</Link>
        </div>
        {
            console.log(email)
        }

    </div>
  )
}

export default SignUp