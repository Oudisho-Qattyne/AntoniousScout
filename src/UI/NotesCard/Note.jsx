import React from 'react'

export default function Note({day , note}) {

    return (
        <>
        {
            note!=''&&
        <div className='relative w-full flex flex-col justify-center items-center bg-custom-white rounded-lg p-2 my-3'>
                {/* <h1 className='relative w-full text-purple font-black text-right py-1'>:اليوم {day}</h1> */}
                <h1 className='relative w-full  text-purple text-right font-black px-3'>{note}</h1>
        </div>
        }
        </>
    )
}
