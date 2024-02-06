import React, { useContext } from 'react'
import logo from './../../assets/logo.png'
import Header from '../../UI/Header'
import { AppContext } from '../../AppState'

export default function Prize() {
    const {AppState} = useContext(AppContext)

  return (
    <div>
            <Header page='!ّ!..اللغز'/>
{
    AppState.login && AppState.home && AppState.rate ?
    <div className='relative w-full min-h-screen bg-custom-white pb-[65px] p-10 flex flex-col justify-start items-center'>
            <div className='relative w-full flex flex-col justify-evenly items-center'>
                <img className='w-44' src={logo} />
                <h1 className='relative text-right text-3xl font-black text-purple pt-5'>{AppState.userName}</h1>
                <h1 className='relative text-right text-3xl font-black text-purple '>{AppState.groupName}</h1>
            </div>
           
        </div>
        :
        <h1 className='pt-20 text-3xl text-green-600 text-center font-bold'>!!!...على وشك الوصول</h1>
}
    
        </div>
  )
}
