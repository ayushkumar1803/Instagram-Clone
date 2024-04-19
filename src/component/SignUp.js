import React, { useContext, useEffect, useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import { doesUsernameExist } from '../functions/firebase'
import FirebaseContext from '../context/Firebase'
function SignUp() {
    const navigate= useNavigate();
    const {firebase}= useContext(FirebaseContext);
    const [username, setUserName] = useState('')
    const [fullName, setfullName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [error , setError]= useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        const usernameExists= await doesUsernameExist(username);
        if(!usernameExists.length){
            try{
                const createdUser= await firebase.auth().createUserWithEmailAndPassword(emailAddress, password);

                await createdUser.user.updateProfile({
                    displayName: username
                });

                await firebase.firestore().collection('users').add({
                    userId: createdUser.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following:[],
                    dateCreated:Date.now()
                });
                navigate('/');
            }
            catch(error){
                setEmailAddress('');
                setfullName('');
                setError(error.message);
                setPassword('');
            }
        }
        else{
            setEmailAddress('');
            setfullName('');
            setUserName('');
            setPassword('');
            setError('Username Already Taken! Please choose another one.')
        }
    }


    const isInvalid = password === '' || username === '' || fullName === '' || emailAddress === '';

    useEffect(() => {
        document.title = 'Sign Up - Instagram'
    }, [])

    return (
        <div className='container flex mx-auto items-center h-screen max-w-screen-md'>
            <div className='flex w-3/5'>
                <img src='/images/iphone-with-profile.jpg' alt='Phone with Instagram App' />
            </div>
            <div className='flex flex-col w-2/5'>
                <div className='flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded'>
                    <h1 className='flex justify-center w-full'>
                        <img src='/images/logo.png' alt='Instagram' className='mt-2 w-6/12 mb-4' />
                    </h1>
                    {error && <p className='text-sm mb-4 text-red-primary'>{error}</p> }
                    <form onSubmit={handleSignUp} method='POST'>
                        <input type='text' 
                        aria-label='Enter your username' 
                        placeholder='Username' 
                        className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-white-primary rounded mb-2' 
                        value={username} 
                        onChange={e => setUserName(e.target.value)} />

                        <input type='text' 
                        aria-label='Enter your Full name' 
                        placeholder='Full Name' 
                        className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-white-primary rounded mb-2' 
                        value={fullName} onChange={e => setfullName(e.target.value)} />

                        <input type='text' 
                        aria-label='Enter your Email address' 
                        placeholder='Email Address' 
                        className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-white-primary rounded mb-2' 
                        value={emailAddress} onChange={e => setEmailAddress(e.target.value)} />

                        <input type='password' 
                        aria-label='Enter your Password' 
                        placeholder='Password' 
                        className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-white-primary rounded mb-2' 
                        value={password} onChange={e => setPassword(e.target.value)} />

                        <button disabled={isInvalid} 
                        className={`bg-blue-medium cursor-pointer text-white w-full h-8 font-bold rounded ${isInvalid && 'opacity-50'}`} 
                        type='submit'>Sign Up</button>
                    </form>
                </div>
                <div className='flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary mb-4 rounded'>
                    <p className='text-sm'>
                        Have an Account?{''}<Link to={'/login'} className='font-bold text-blue-medium bg-gray'>Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
