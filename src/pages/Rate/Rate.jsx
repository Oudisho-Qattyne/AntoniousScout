import React, { useContext, useEffect, useState } from 'react'
import logo from './../../assets/logo.png'
import StarsRate from '../../UI/StarsRate'
import RateCard from '../../UI/RateCard/RateCard'
import NotesCard from '../../UI/NotesCard/NotesCard'
import { AppContext } from '../../AppState'
import Header from '../../UI/Header'
import scout from '../../axios/scout'
import Spinner from '../../UI/Spinner'

export default function Rate() {
  const { AppState, dispatch } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [rates , setRates] = useState([])
  const [notes , setNotes] = useState([])


  const fetchRate = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem('token')
      const res = await scout({
        method: 'POST',
        url: `/musician/v1/rate`,
        headers: {
          "Accept": 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(res);
      let rates = []
      let notes = res.data.notes
      for (let i = 0; i < res.data.musicRate.length; i++) {
        const newRate = {
          day:i+1,
          musicRate:res.data.musicRate[i].rate,
          scoutRate:res.data.scoutRate[i].rate
        }
        rates.push(newRate)
      }
      setRates(rates)
      setNotes(notes)
      setLoading(false)
    } catch (error) {
      if(error?.response?.status==404){

      }
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRate()
  } , [])
  return (
    <div>
      <Header page='التقييم' />

      <div className='relative w-full min-h-screen bg-custom-white pb-[65px] p-10 flex flex-col justify-start items-center'>

        <div className='relative w-full flex flex-col justify-evenly items-center'>
          <img  className='w-44' src={logo} />
          <h1 className='relative text-right text-3xl font-black text-purple pt-5'>{AppState.userName}</h1>
          <h1 className='relative text-right text-3xl font-black text-purple '>{AppState.groupName}</h1>
        </div>
        <div className='w-full'></div>
        <RateCard rates={rates} />
        <NotesCard notes={notes} />
      </div>
      {
        loading && 
        <Spinner/>
      }
    </div>
  )
}
