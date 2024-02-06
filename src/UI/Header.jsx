import React, { useContext, useState } from 'react'
import HeaderImg from './../assets/HeaderImg.svg'
import { AppContext } from '../AppState';
import scout from '../axios/scout';
import Spinner from './Spinner';

export default function Header({ page }) {
  const { AppState, dispatch } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  return (
    <div style={{ '--image-url': `url(${HeaderImg})` }}
      className='relative w-screen h-[100px] flex flex-row-reverse justify-between items-center bg-cover bg-center bg-no-repeat bg-[image:var(--image-url)] bg-custom-white z-10'>
      <div className='relative -top-5 flex flex-row-reverse justify-center items-center'>
        <img className=' w-14' src={AppState.profilePic} />
        <h1 className='text-white font-black'>{page}</h1>
      </div>
      {AppState.logedIn && !AppState.visitor && <h1 onClick={async () => {
        try {
          setLoading(true)
          setError(null)
          const token = localStorage.getItem('token')
          const res = await scout({
            method: 'POST',
            url: `/${AppState.role}/v1/logout`,
            headers: {
              "Accept": 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
          localStorage.removeItem('token');
          localStorage.removeItem("userName");
          localStorage.removeItem("groupName");
          localStorage.removeItem("role");
          localStorage.removeItem("profilePic");

          dispatch({ type: 'set', prop: 'logedIn', value: false })
          dispatch({ type: 'set', prop: 'userName', value: '' })
          dispatch({ type: 'set', prop: 'role', value: '' })
          dispatch({ type: 'set', prop: 'groupName', value: '' })
          dispatch({ type: 'set', prop: 'profilePic', value: '' })
          setLoading(false)

        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem("userName");
          localStorage.removeItem("groupName");
          localStorage.removeItem("role");
          localStorage.removeItem("profilePic");

          dispatch({ type: 'set', prop: 'logedIn', value: false })
          dispatch({ type: 'set', prop: 'userName', value: '' })
          dispatch({ type: 'set', prop: 'role', value: '' })
          dispatch({ type: 'set', prop: 'groupName', value: '' })
          dispatch({ type: 'set', prop: 'profilePic', value: '' })
          setLoading(false)
        }

      }} className='relative -top-4 text-white h-full w-fit  flex justify-center items-center px-3 font-black'
      >تسجيل خروج
      </h1>
      }
      {
        loading &&
        <Spinner />
      }
      {
        error &&
        <div className='fixed w-screen h-screen top-0 left-0 flex justify-center items-center '>
          <div className='relative w-full h-full backdrop-blur-lg' />
          <div className='absolute w-[300px] bg-custom-white flex justify-center items-center rounded-lg shadow-lg '>
            <h1 className='relative w-full text-center text-xl text-red-600 font-black'>حدث خطأ في عملية تسجيل الخروج</h1>
          </div>
        </div>
      }
    </div>
  )
}
