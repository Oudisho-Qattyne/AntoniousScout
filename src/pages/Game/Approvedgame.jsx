import React from 'react'

export default function Approvedgame({task}) {
    return (
        <div className='relative w-full flex flex-row-reverse justify-evenly items-center bg-purple rounded-lg p-5  '>
            <h1 key='task' className='relative w-full text-right text-white text-xl font-black'>{task}</h1>
            <h1 key='rate' className='relative w-full text-left text-green-600 bg-white rounded-full text-xl font-black'>تم </h1>
        </div>
    )
}
