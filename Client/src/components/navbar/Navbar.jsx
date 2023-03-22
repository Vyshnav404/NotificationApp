import "./navbar.css"
import React, { useEffect, useState } from 'react'
import { Socket } from "socket.io-client";

const Navbar = ({socket}) => {

    const [notifications,setNotifications] = useState([]);
    const[open,setOpen] = useState(false)
    useEffect(()=>{
        try {
            socket.on("getNotification",(data)=>{
            setNotifications((prev)=> [...prev,data]);
            })
            
        } catch (error) {
            console.log("Error in getNotification event",error);
        }
    },[socket]);

    console.log(notifications)

    const displayNotification = ({senderName,type})=>{
        let action;
        if(type===1){
            action="liked"
        }
        return(
            <span className="notification">{`${senderName} ${action} your post`}</span>
        )
    }

    const handleRead =()=>{
        setNotifications([])
        setOpen(false)
    }

  return (
    <div className="navbar">
        <span className="logo">Notification App</span>
        <div className="icons">
            <div className="icon" onClick={()=>setOpen(!open)}>
        <i class="fa-solid fa-bell"></i>
        {
            notifications.length >0 &&
        <div className="counter">{notifications.length}</div>
        }
            </div>       
        <div className="icon">
        <i class="fa-solid fa-message"></i>
        </div>
        <div className="icon">
        <i class="fa-solid fa-gear"></i>
        </div>
        </div>
        {
            open &&(
        <div className="notifications">
            {notifications.map((n)=> displayNotification(n))}
            <button className="nButton" onClick={handleRead}>Mark as read</button>
        </div>

            )
        }
    </div>
  )
}

export default Navbar
