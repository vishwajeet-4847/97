import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router'

const HomeScreen = () => {
  const isPasswordChanged = true;
  return (
    <div className='bg-[#ededed]'>
        <Header isPasswordChanged={isPasswordChanged}/>
        <Outlet />
    </div>
  )
}

export default HomeScreen