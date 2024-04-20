import React, { useEffect } from 'react'
import Header from './Header'

function NotFound() {

  useEffect(()=>{
    document.title='Not Found - Instagram'
  })

  return (
    <div className='bg-gray-background'>
      <Header/>
      <p className='items-center mx-auto'>Nothing!</p>
    </div>
  )
}

export default NotFound
