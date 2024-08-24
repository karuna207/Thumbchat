import React, { useState } from "react"; 
import "./chatlist.css" 
import AddUser from "./addUser/addUser.jsx";

function Chatlist(){ 

    const [mode ,setMode]=useState(false) ;
    function changeMode(){
        setMode((prev)=>{
            return !prev;
        })
    }


     
    return <div className="chatList">
        <div className="search">
            <div className="searchbar">
                <img src="./search.png"></img> 
                <input placeholder="Search" type="text"></input>
             </div> 
            <img src={mode ? "./minus.png":"./plus.png"} onClick={changeMode} className="add"></img>
        </div> 

        <div className="item">
            <img src="./avatar.png"></img> 
            <div className="texts">
                <span>haris</span> 
                <p>this is last message</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png"></img> 
            <div className="texts">
                <span>haris</span> 
                <p>this is last message</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png"></img> 
            <div className="texts">
                <span>haris</span> 
                <p>this is last message</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png"></img> 
            <div className="texts">
                <span>haris</span> 
                <p>this is last message</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png"></img> 
            <div className="texts">
                <span>haris</span> 
                <p>this is last message</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png"></img> 
            <div className="texts">
                <span>haris</span> 
                <p>this is last message</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png"></img> 
            <div className="texts">
                <span>haris</span> 
                <p>this is last message</p>
            </div>
        </div> 
        {mode ? <AddUser /> : null}
    </div> 
} 

export default Chatlist;