import React from "react";
import "./chat.css";

function Chat() {
  return <p className="chat">
    <div className="top">
        <div className="user"> 
            <img src="./avatar.png"></img> 
            <div className="text"> 
                <span>Name</span>
                <p>Lorem ipsum, dolor sit eat accusantium numquam reiciendis voluptate atque dolores officia velit et, natus molestiae eos eligendi!</p>            
            </div>       
        </div>  
        <div className="icons">
            <img src="./phone.png"></img>
            <img src="./video.png"></img>
            <img src="./info.png"></img>

        </div>
    </div> 
    <div className="center">



    </div>
    <div className="bottom">
        <div className="icons">
            <img src="./img.png"></img>
            <img src="./camera.png"></img>
            <img src="./mic.png"></img>
        </div> 
        <input className='getinput'type='text' placeholder="Type a message..."></input>
        <div className="emoji">
            <img src="./emoji.png"></img>
        </div>
        <button className="sendButton">Send</button>

    </div>
  </p>;
}

export default Chat;
