import React from 'react'
import StarsRate from '../StarsRate'
export default function DailyRate({musicRate , scoutRate , day}) {
  return (
    <div className='my-5'>
        <h1 className='relative w-full text-white font-black text-right '>:اليوم {day}</h1>
        <div className='relative w-full flex justify-between items-center py-3 pr-3'>
                <StarsRate rate={musicRate}/>
                <h1 className='relative text-white font-black text-right '>:تقييم عزفي</h1>
            </div>
            <div className='relative w-full flex justify-between items-center py-3 pr-3'>
                <StarsRate rate={scoutRate}/>
                <h1 className='relative text-white font-black text-right '>:تقييم كشفي</h1>
            </div>
    </div>
  )
}
