import React from 'react'
import "./home.css"
import Header from '../../component/Header/Header'
import Post from '../../component/Posts/Post'
import Sidebar from '../../component/Sidebar/Sidebar'

export default function Home() {
  return (
    <>
        <Header/>
        <div className="home">
            <Post/>
            <Sidebar/>
            
        </div>
    </>
  )
}
//25