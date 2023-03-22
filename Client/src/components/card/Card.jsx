import './card.css'

import React, { useState } from 'react'

const Card = ({post ,socket,user}) => {
  const [ liked, setLiked ] = useState(false)
 const handleNotification = (type)=>{
  setLiked(true)
  socket.emit("sendNotification",{
    senderName:user,
    receiverName:post.username,
    type,
  })
 }

  return (
    <div className='card'>
    <div className='info'>
    <img src={post.userImg} alt=""  className='userImg'/>
    <span>{post.fullname}</span>
    </div>
    <img src={post.postImg } alt="" className='postImg' />
    <div className='interaction'>
    
    <div className='cardIcon'>
      {
        liked ?(<i class="fa-solid fa-heart"></i>):(<i class="fa-regular fa-heart"  onClick={()=>handleNotification(1)}></i>)
      }
    
    </div>
    <div className='cardIcon'>
    <i class="fa-regular fa-comment" ></i>
    </div>
    <div className='cardIcon'>
    <i class="fa-regular fa-share-from-square" ></i>
    </div>
    <div className='cardIcon infoIcon'>
    <i class="fa-solid fa-circle-info" ></i>
    </div>
    </div>
    </div>
  )
}

export default Card
