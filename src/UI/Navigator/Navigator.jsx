import React, { useContext } from 'react'
import Home from './../../assets/Home.svg'
import Game from './../../assets/Game.svg'
import Rate from './../../assets/Rate.svg'
import Prize from './../../assets/prize.gif'
import { AppContext } from '../../AppState'
export default function Navigator() {
    const { AppState } = useContext(AppContext)
    const NavItems = AppState.role == 'team leader' ? [
        {
            name: 'الرئيسية',
            path: '/',
            icon: Home,
        },
        {
            name: 'اللعبة',
            path: '/game',
            icon: Game
        },
        {
            name: 'التقييم',
            path: '/rate',
            icon: Rate
        }

    ] :
        [
            {
                name: 'الرئيسية',
                path: '/',
                icon: Home,
            },
            {
                name: 'التقييم',
                path: '/rate',
                icon: Rate
            }

        ]
    return (
        <div className='fixed bottom-0 w-full h-[64px] bg-purple flex justify-evenly items-center'>
            {NavItems.map(item =>
                <a key={item.path} href={item.path}>
                    <div className='w-[100px] h-[63px] flex flex-col justify-center items-center '>
                        <img src={item.icon} />
                        <h1 className='text-lg font-black text-center'>{item.name}</h1>
                    </div>
                </a>
            )}
            {
                AppState.login && AppState.home && AppState.rate &&
                <a key='prize' href='/prize'>
                <div className='w-[100px] h-[63px] flex flex-col justify-center items-center '>
                    <img className='w-20' src={Prize} />
                </div>
                </a>
            }
        </div>
    )
}
