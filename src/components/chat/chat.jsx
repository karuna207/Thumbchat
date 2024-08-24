import React, { useState,useRef,useEffect } from "react";
import "./chat.css"; 
import EmojiPicker from "emoji-picker-react";

function Chat() { 
    const [open,setOpen]=useState(false);  
    const [text,setText]=useState(""); 
    const endRef=useRef(null); 

    useEffect(()=>{
        endRef.current?.scrollIntoView({behavior:"smooth"})
    },[])

    function handleOpen(){
        setOpen((prev)=>{
            return !prev;
        })
    }  

    console.log(text);

    function handleEmoji(e){
        console.log(e); 
        setText((prev)=>{
            return prev+e.emoji; 
        }) 
        setOpen((prev)=>{
            return !prev;
        }) 
    }
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
        <div className="message">
            <img src="./avatar.png"></img> 
            <div className="text">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia veniam facilis, dolore, odio quasi iste et magnam non a, delectus nobis vel error sint! Molestias, voluptas. Hic nesciunt dolor aliquam?</p>
                <span>1 min ago </span>        
            </div>
        </div>
        <div className="message own">
       
            <div className="text">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia veniam facilis, dolore, odio quasi iste et magnam non a, delectus nobis vel error sint! Molestias, voluptas. Hic nesciunt dolor aliquam?</p>
                <span>1 min ago </span>        
            </div>
        </div>
        <div className="message">
            <img src="./avatar.png"></img> 
            <div className="text">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia veniam facilis, dolore, odio quasi iste et magnam non a, delectus nobis vel error sint! Molestias, voluptas. Hic nesciunt dolor aliquam?</p>
                <span>1 min ago </span>        
            </div>
        </div>
        <div className="message own">
           
            <div className="text"> 
            <img src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg"></img>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia veniam facilis, dolore, odio quasi iste et magnam non a, delectus nobis vel error sint! Molestias, voluptas. Hic nesciunt dolor aliquam?</p>
                <span>1 min ago </span>        
            </div>
        </div> 
        <div ref={endRef}></div>
    </div>
    <div className="bottom">
        <div className="icons">
            <img src="./img.png"></img>
            <img src="./camera.png"></img>
            <img src="./mic.png"></img>
        </div> 
        <input className='getinput' type='text' value={text} placeholder="Type a message..." onChange={(e)=>{
            // console.log(e);
            setText(e.target.value);
        }}></input>
        <div className="emoji">
            <img src="./emoji.png" onClick={handleOpen}></img>  
            <div className="picker">
                <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
            </div>
            
        </div>
        <button className="sendButton">Send</button>

    </div>
  </p>;
}

export default Chat;
