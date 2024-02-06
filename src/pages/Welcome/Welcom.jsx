import React, { useContext, useState } from 'react'
import logo from './../../assets/logo.png'
import Header from '../../UI/Header'
import SignUp from '../SignIn/SignUp'
import SignIn from '../SignUp/SignIn'
import { AnimatePresence, motion } from 'framer-motion'
import { AppContext } from '../../AppState'

export default function Welcom({setLogedIn}) {
    const [signUp, setSignUp] = useState(null)
    const {AppState , dispatch} = useContext(AppContext)
    const visitor = () => {
        dispatch({type:'set' , prop:'visitor' , value:true})
        dispatch({type:'set' , prop:'logedIn' , value:true})
        dispatch({type:'set' , prop:'userName' , value:'زائر'})
    }
    return (
        <div className='relative w-screen min-h-screen bg-custom-white pb-[65px] flex flex-col justify-start items-center'>
            <AnimatePresence>
                <Header key='header' />
                <img className='w-44' src={logo} key="logo" />
                
                {signUp == 'signUp' && <SignUp key='signUp' setLogedIn={setLogedIn} setSignUp={setSignUp} />}
                {signUp == 'signIn' && <SignIn key='signin' setLogedIn={setLogedIn} setSignUp={setSignUp} />}
                {signUp == null && <motion.div  className='absolute top-[300px] flex justify-center items-center flex-col' key='welcome' initial={{ x: 1000 }} animate={{ x: 0 }} exit={{ x: -1000 }}>
                    <div className='max-w-[400px] h-full flex flex-col justify-center items-center'>
                        <div className=' min-w-[300px] min-h-[40px] flex flex-col justify-center items-center py-10'>
                            <h1 onClick={() => setSignUp('signIn')} className='min-w-full min-h-full text-center text-white font-bold bg-purple rounded-[5px] hover:bg-dark-purple cursor-pointer p-1 '>
                                تسجيل الدخول
                            </h1>
                        </div>
                        <div className='min-w-full flex flex-row justify-center items-center'>
                            <div className='min-w-[30%] h-[2px] rounded-full bg-black' />
                            <h1 className='text-black px-10'>أو</h1>
                            <div className='min-w-[30%] h-[2px] rounded-full bg-black' />
                        </div>
                        
                        <div className=' min-w-[300px] min-h-[40px] flex flex-col justify-center items-center py-10'>
                            <h1 onClick={() => visitor('signUp')} className='min-w-full min-h-full text-center text-black font-bold bg-white rounded-[5px] cursor-pointer border border-1 border-black p-1 '>
                                الدخول كزائر
                            </h1>
                        </div>
                    </div>
                </motion.div>}
            </AnimatePresence>
        </div>

    )
}
