import Navbar from '@/components/Navbar'
import React from 'react'

const HomePage = () => {
  return (
    <div className='bg flex flex-col justify-start items-center scrollbar-hidden content'>
        <Navbar isSticky={true}></Navbar>
        <div className='h-[200vh] w-full'></div>
    </div>
  )
}

export default HomePage