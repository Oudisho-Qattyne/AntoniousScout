import React from 'react'
import Day from './Day'

export default function GlobalTask({days}) {
  return (
    <div className='relative w-full h-fit flex flex-col justify-center items-center rounded-lg  mt-6 p-5'>
            <h1 className='relative w-full text-center text-purple text-3xl pb-5 font-bold'>المهمات اليومية</h1>
            {
              days.map(day => <Day day={day._id} tasks={day.tasks}/>)
            }
            {
                days.length==0 &&
                <h1 className='relative w-full text-center text-[#707070] text-xl font-black py-10'>لا يوجد مهمات</h1>
            }
            
    </div>
  )
}
