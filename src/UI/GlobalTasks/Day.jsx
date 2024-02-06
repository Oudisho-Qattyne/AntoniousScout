import React, { useState } from 'react'
import { motion } from 'framer-motion'
import downArrow from './../../assets/downArrow.png'
import Task from './Task'
export default function Day({ day, tasks }) {
    const [open, setOpen] = useState(false)
    return (
        <motion.div initial={{ height: 'auto' }} animate={open ? { height: 'fit-content' } : { height: '55px' }} className='relative w-full h-fit flex flex-col justify-start items-center bg-purple rounded-lg shadow-md mt-6 p-3 overflow-hidden'>
            <div onClick={() => setOpen(prev => !prev)} className='relative w-full flex flex-row-reverse justify-between items-center pb-5'>
                <h1 className='relative  text-white text-right font-black text-lg'>:مهمات اليوم {day}</h1>
                <motion.img animate={open ? {rotate:180} : {rotate:0}} className='relative w-6' src={downArrow}/>
            </div>
            {
                tasks.map(task => <Task task={task.task} completed={task.completed}/>)
            }

        </motion.div>
    )
}
