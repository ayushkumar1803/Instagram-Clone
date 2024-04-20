import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/Firebase';


function LogIn() {

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const {firebase} = useContext(FirebaseContext);
  const navigate= useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress,password);
      navigate('/');
    }
    catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };
  const isInvalid = password === "" || emailAddress === "";
  useEffect(() => {
    document.title = 'Login - Instagram';
  }, [])

  return (
    <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
      <div className='flex w-3/5'>
        <img src='/images/iphone-with-profile.jpg' alt='Phone with Instagram App' />
      </div>
      <div className='flex flex-col w-2/5'>
        <div className='flex flex-col items-center p-4 border border-gray-primary mb-4 rounded'>
          <h1 className='flex justify-center w-full'>
            <img src='/images/logo.png' alt='Instagram' className='mt-2 w-6/12 mb-4' />
          </h1>
          {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}
          <form onSubmit={handleLogin} method='POST'>
            <input type='text' aria-label='Enter your email address' placeholder='Email address' 
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-white-primary rounded mb-2' 
            value={emailAddress} onChange={e => setEmailAddress(e.target.value)}/>

            <input type='password' aria-label='Enter your Password' placeholder='Password' 
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-white-primary rounded mb-2' 
            value={password} onChange={e => setPassword(e.target.value)}/>

            <button type='submit' disabled={isInvalid} className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'} cursor-pointer`}>Login</button>
          </form>
        </div>
        <div className='flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary'>
          <p className='text-sm'>
            Don't have an Account?{''}<Link to={'/signup'} className='font-bold text-blue-medium bg-gray'>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LogIn
