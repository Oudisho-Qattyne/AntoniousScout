import React, { useContext, useEffect, useState } from 'react'
import logo from './../../assets/logo.png'
import Header from '../../UI/Header'
import { AppContext } from '../../AppState'
import GameTask from './GameTask'
import scout from '../../axios/scout'
import Spinner from '../../UI/Spinner'
import { parsePath } from 'react-router-dom'
import Approvedgame from './Approvedgame'

export default function Game() {
    const { AppState } = useContext(AppContext)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [showedGame, setShowedGame] = useState(null)
    const [game, setGame] = useState([])

    const sendPic = async (photo, id) => {
        console.log(id);
        // setGame(prev => {
        //     return(
        //         prev.map(task => {
        //             if(task.id == image){
        //                 task.approved=true
        //             }
        //             return(task)
        //         })
        //     )
        // })
        setLoading(true)
        setError(null)
        try {
            const token = localStorage.getItem('token')
            let formData = new FormData()
            formData.append('photo', photo, photo.name);
            const res = await scout.post('/game/v1/uploadphoto',
                formData,
                {
                    headers: {
                        "Accept": 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                    params: {
                        id: id
                    }
                })
            if (res?.status == 200) {
                const games = await scout({
                    method: 'POST',
                    url: '/game/v1/getgames',
                    headers: {
                        "Accept": 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                })
                setGame(games)
            }
            setLoading(false)
        } catch (error) {
            console.log('Error', error.response);
            setLoading(false)
        }
    }

    const fetshGame = async () => {
        const token = localStorage.getItem('token')
        setLoading(true)
        setError(null)
        try {
            const games = await scout({
                method: 'POST',
                url: '/game/v1/getgames',
                headers: {
                    "Accept": 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            setGame(games.data.games)
            setLoading(false)
        } catch (error) {
            setError(error?.response?.message)
            setLoading(false)

        }
    }


    useEffect(() => {
        fetshGame()
    }, [])

    useEffect(() => {
        setShowedGame(null)
        for (let i = 0; i < game.length; i++) {
            if (game[i].approved == false) {
                setShowedGame(game[i])
                break;
            }
        }

    }, [game])
    return (
        <div>
            <Header page='اللعبة' />
            {
                AppState.role == 'team leader' ?
                    <>
                        <div className='relative w-full min-h-screen bg-custom-white pb-[65px] p-10 flex flex-col justify-start items-center'>
                            <div className='relative w-full flex flex-col justify-evenly items-center'>
                                <img className='w-44' src={logo} />
                                <h1 className='relative text-right text-3xl font-black text-purple pt-5'>{AppState.userName}</h1>
                                <h1 className='relative text-right text-3xl font-black text-purple '>{AppState.groupName}</h1>
                            </div>
                            <h1 className='relative w-full text-3xl text-purple text-center py-10'>المهمات</h1>
                            
                            {
                                showedGame ?
                                    <GameTask completed={showedGame.completed} task={showedGame.task} taskPic={showedGame.taskPic} sendPic={sendPic} id={showedGame._id} /> :
                                    <h1 className='relative w-full text-3xl text-green-600 text-center py-10'>انتهت المهمات</h1>
                            }

                        </div>
                        {
                            loading &&
                            <Spinner />
                        }
                    </>

                    :
                    <h1 className='text-red-600 text-3xl font-black text-center py-20'>!!!!!...انت لست قائد فصيلة</h1>
            }
        </div>
    )
}
