import React from 'react'
import FullStar from './../assets/fullStar.png'
import Star from './../assets/star.png'

export default function StarsRate({rate}) {
    let stars = []
    for (let i = 0; i < 5; i++) {
      if(i<rate){
        const star = <img className='w-6 h-6' src={FullStar} />
        stars.push(star)
      }
      else{
        const star = <img className='w-6 h-6' src={Star} />
        stars.push(star)
      }
      
    }
  return (
    <div className='w-fit flex justify-center items-center'>
{stars}
    </div>
  )
}
