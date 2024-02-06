import React from 'react'
import rope from './../assets/rope.png'
import w from './../assets/w.png'
import {motion} from 'framer-motion'
import loader from './../assets/loader.png'
export default function Spinner() {
  return (
    <div className=' fixed top-0 left-0 w-screen h-screen z-30 flex justify-center items-center'>
<div className=' absolute min-w-full min-h-full backdrop-blur-lg'/>
    <div className='w-full flex justify-center items-center '>
        <img src={rope} className='absolute w-40 '/>
        <img src={w} className='absolute w-40 '/>
        <div className=' relative top-40'>
        <h1 className=' relative  text-purple font-black py-3 text-center text-xl animate-pulse'>
            الرجاء الانتظار
        </h1>
        {/* <motion.img animate={{rotate:360}} transition={{ repeat: Infinity , }} src={loader} className='relative'/> */}
        </div>
    </div>
    </div>
  )
}
