import React from 'react'

function EmailList() {
  return (
    <div className='w-full h-60 bg-[#003173] dark:bg-[#1E1E1E] flex justify-center items-center flex-col gap-4 text-white '>
         <h1 className='text-5xl font-bold'>Save time, Save money!</h1>
         <p className='text-lg'>sign Up and We'll Send the Best Deals to you</p>
        <div className='flex gap-2'>
        <input type="text" className='rounded-lg p-2 '  placeholder='Your Email' />
        <button className='bg-blue-600 p-2 rounded-lg'>Subscibe</button>
        </div>
    </div>
  )
}

export default EmailList