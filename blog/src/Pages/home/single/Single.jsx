import React from 'react'
import "./Single.css"
import Sidebar from '../../../component/Sidebar/Sidebar'
import SinglePost from '../../../component/SinglePst/SinglePost'
export default function single() {
  return (
    <div className='single'>
        <SinglePost/>
        <Sidebar/>
    </div>
  )
}
