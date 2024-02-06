import React, { useContext } from 'react'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home.jsx';
import Game from './pages/Game/Game.jsx';
import Rate from './pages/Rate/Rate.jsx';
import Navigator from './UI/Navigator/Navigator.jsx';
import Header from './UI/Header.jsx';
import Welcom from './pages/Welcome/Welcom.jsx';
import Prize from './pages/Prize/Prize.jsx';
import { AppContext } from './AppState.jsx';
export default function Layout() {
    const { AppState, dispatch } = useContext(AppContext)
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: '/game',
            element: <Game />
        },
        {
            path: '/rate',
            element: <Rate />
        },
        {
            path: '/prize',
            element: <Prize />
        }

    ]);
    return (
        <div>
            <RouterProvider router={router} />\
            {
                !AppState.visitor &&
                <Navigator />
            }
        </div>
    )
}
