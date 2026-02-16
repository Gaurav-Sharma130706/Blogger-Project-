import { useState,useEffect } from 'react'
import './App.css'
import {useDispatch} from "react-redux"
import authService from './appwrite/auth.service.js'
import {login,logout} from './store/authSlice.js'
import {Header,Footer} from './components'
import { Outlet } from 'react-router-dom'

function App() {
    const [loading, setLoading]= useState(true)
    const dispatch= useDispatch()

    useEffect(()=>{
      authService.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login({userData}))
        }
        else{
          dispatch(logout())
        }
      })
      .finally(()=>setLoading(false))
    },[])

  if(!loading){
    return(
    <div className='app-wrapper'>      
      <div className='app-content'>    
        <Header />
        <main>                         
          <Outlet />
        </main>                        
      </div>                           
      <Footer />
    </div>
    )
  }
  else{
    return null
  }
}

export default App
