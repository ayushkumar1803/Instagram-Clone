import React, { useContext, useEffect } from 'react'
import Header from './Header'
import PropTypes from 'prop-types'
import Timeline from './Timeline'
import Sidebar from '../sidebar/index'
import UseUser from '../hooks/use-user'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const {user:{username}} =UseUser();
  console.log('username',username);
  const navigate= useNavigate();
    useEffect(()=>{
        document.title='Instagram'
    },[])

  return (
      <div className='bg-gray-background'>
        {username?.length!==0 ? (
          <div>
          <Header/>
        <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
          <Timeline/>
          <Sidebar/>
        </div>
        </div>
        ):(
          navigate('/login')
        )}
      </div>

    
  )
}

Dashboard.propTypes={
    user:PropTypes.object.isRequired
}

export default Dashboard
