import { useContext, useEffect, useState } from 'react'
import './App.css'
import Layout from './Layout'
import Welcom from './pages/Welcome/Welcom'
import { AnimatePresence } from 'framer-motion'
import { AppContext, StateProvider } from './AppState'
function App() {

  const [logedIn , setLogedIn] = useState(true)
const {AppState , dispatch} = useContext(AppContext)
  useEffect(  () => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const groupName = localStorage.getItem("groupName");
    const role = localStorage.getItem("role");
    const profilePic = localStorage.getItem("profilePic");
    if(token){
      dispatch({type:'set' , prop:'logedIn' , value:true})
      dispatch({type:'set' , prop:'userName' , value:userName})
      dispatch({type:'set' , prop:'role' , value:role})
      dispatch({type:'set' , prop:'groupName' , value:groupName})
      dispatch({type:'set' , prop:'profilePic' , value:profilePic})
    }
  } , [])
  return (
    <AnimatePresence>
    <div className='w-full h-full justify-center items-center'>
      {
        AppState.logedIn ? 
        <Layout /> :
        <Welcom setLogedIn={setLogedIn}/>
      }
    </div>
    </AnimatePresence>
  )
}

export default App
