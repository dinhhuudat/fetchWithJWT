import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { fetchInstance } from '../utils/fetchInstance'

export default function Home() {
  // const [token,setToken]=
  const handleGetToken=async ()=>{
    const res=await fetch("http://localhost:5000/getToken")
    const token =await res.json()
    localStorage.setItem("token",JSON.stringify(token))
  }
  
  const handleSendToken=async ()=>{ 

    const data = fetchInstance("/sendToken") 
     console.log("sendToken",data)
  }
  
  const handleRefresh=async ()=>{
    const local=localStorage.getItem("token")
    const {token,refreshToken} =!!local && JSON.parse(local)
    
    const res=refreshToken && await fetch("http://localhost:5000/refreshToken",{method:"POST",body:JSON.stringify({refreshToken})})
    console.log("new token",res)
  }

  return (
    <div className={styles.container}>
      <button onClick={handleGetToken}>get Token</button>
      <button onClick={handleSendToken}>send with Token</button>
      <button onClick={handleRefresh}>get new fresh token</button>
    </div>
  )
}
