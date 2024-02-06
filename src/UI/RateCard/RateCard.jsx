import React from 'react'

import DailyRate from './DailyRate'

export default function RateCard({ rates }) {
    return (
        <div className='relative w-full h-fit flex flex-col justify-center items-center bg-purple rounded-lg shadow-md mt-6 p-5'>
            <h1 className='relative w-full text-center text-white text-3xl pb-5'>التقييم</h1>
            {rates.map(rate =>
                <DailyRate musicRate={rate.musicRate} scoutRate={rate.scoutRate} day={rate.day} />
            )}
            {
                rates.length == 0 &&
                <h1 className='text-white text-xl font-black text-center'>لا يوجد تقييمات حالياً</h1>
            }

        </div>
    )
}
