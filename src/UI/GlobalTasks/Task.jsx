import React from 'react'

export default function Task({ task  , completed }) {
    return (
        <div className='relative w-full bg-custom-white p-5 rounded-lg my-3 flex flex-col justify-end items-center'>
            <h1  className='text-black text-xl font-black text-right my-3 '
            style={completed ? {textDecoration:'line-through'} : {}}>
                {task}
            </h1>
        </div>
    )
}
