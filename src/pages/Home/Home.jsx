import React, { useContext, useEffect, useRef, useState } from 'react'
import logo from './../../assets/logo.png'
import GlobalTask from '../../UI/GlobalTasks/GlobalTask'
import { AppContext } from '../../AppState'
import Spinner from '../../UI/Spinner'
import scout from '../../axios/scout'
import Header from '../../UI/Header'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Home() {
    const { AppState, dispatch } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [days, setDays] = useState([])
    const [publicImages, setPublicImages] = useState([])
    const prevEl = useRef()
    const nextEl = useRef()

    useEffect(() => {
        fetshTasks()
        fetchTasksPic()
    }, [])
    const fetshTasks = async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await scout.post('/musician/v1/home')
            // const tasks = res.data.task
            // const sortedTasks = tasks.
            setDays(res.data.task)
            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const fetchTasksPic = async () => {
        try {
            setLoading(true)
            setError(null)
            const photos = await scout({
                method: 'GET',
                url: '/musician/v1/publicphotos',
            })
            // setPublicImages(res.data)
            console.log(photos.data.pics);
            setPublicImages(photos.data.pics)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setError(error)
            setLoading(false)
        }
    }
    return (
        <div>
            <Header page='الرئيسية' />

            <div className='relative w-full min-h-screen bg-custom-white pb-[65px] p-5 flex flex-col justify-start items-center'>
                <div className='relative w-full flex flex-col justify-evenly items-center'>
                    <img className='w-44' src={logo} />
                    <h1 className='relative text-right text-3xl font-black text-purple pt-5'>{AppState.userName}</h1>
                    <h1 className='relative text-right text-3xl font-black text-purple '>{AppState.groupName}</h1>
                </div>
                <Swiper
                
                    spaceBetween={1}
                    slidesPerView={1}
                    navigation={
                        {
                            prevEl:prevEl,
                            nextEl:nextEl
                        }
                    }
                    className='relative max-w-full h-[400px] flex justify-center items-center'
                >
                    {
                        publicImages.map(image =>
                            <SwiperSlide className='relative w-full flex justify-center items-center rounded-lg p-6 '>
                                {/* <img src={image.taskPic} className='relative w-[200px]'/> */}
                                <div style={{ '--image-url': `url(${image.taskPic})` }} className='relative w-[400px] h-full bg-[image:var(--image-url)]  bg-cover rounded-xl shadow-md' />
                            </SwiperSlide>
                        )
                    }

                </Swiper>
                {/* <div className='w-full flex justify-center items-center gap-5'>
                    <div ref={prevEl} className='flex justify-center items-center ' >
                        <h1 className='select-none text-xl w-16 h-16  text-white  hover:font-bold rounded-full  cursor-pointer flex justify-center items-center bg-purple' >
                            &lt;
                        </h1>
                    </div>

                    <div ref={nextEl} className='flex justify-center items-center  '>
                        <h1 className='select-none  text-xl w-16 h-16 text-white hover:font-bold rounded-full  cursor-pointer flex justify-center items-center bg-purple' >
                            &gt;
                        </h1>
                    </div>
                </div> */}
                <GlobalTask days={days} />
                {
                    loading &&
                    <Spinner />

                }
                {
                    error &&
                    <h1 className='text-red-600 text-xl font-black'>{error}</h1>
                }
            </div>
        </div>
    )
}
