import React from "react";
import "./details.css";
import { auth, db } from "../../lib/firebase"; 
import useChatStore from "../../lib/chatStore";
import useUserStore from "../../lib/userStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

function Details() { 
  const {chatId,user,isCurrentUserBlocked,isReceiverBlocked,changeBlock}=useChatStore();
  const{currentUser}=useUserStore();

  async function handleBlock(){
    if (!user){
      return ;

    } 
    const userDocRef=doc(db,"users",currentUser.id);
    try{
      await updateDoc(userDocRef,{
        blocked:isReceiverBlocked?arrayRemove(user.id):arrayUnion(user.id), 

      }); 
      changeBlock();


    }catch(err){
      console.log(err);
    }
  }
  return (
    <p className="details">
      <div className="user">
        <img src={user?.avatar||"./avatar.png"}></img>
        <h2>{user?.username}</h2>
        <p>
          Lorem ipsum dolor sit amet,
        </p>
      </div>
      <div className="info">
        
        <div className="options">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png"></img>
          </div>
        </div>
        <div className="options">
          <div className="title">
            <span>Privacy Help</span>
            <img src="./arrowUp.png"></img>
          </div>
        </div>
        <div className="options">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png"></img>
          </div>
          <div className="photos">
            <div className="photoitem">
              <div className="photodetail">
                <img src="https://tse1.mm.bing.net/th?id=OIP.GFwo2CkHWgAieK4ZNF0pZgHaE8&pid=Api&P=0&h=180"></img>
                <span>Name</span>
              </div>
                <img src="./download.png"></img>
            </div>
            <div className="photoitem">
              <div className="photodetail">
                <img src="https://tse1.mm.bing.net/th?id=OIP.GFwo2CkHWgAieK4ZNF0pZgHaE8&pid=Api&P=0&h=180"></img>
                <span>Name</span>
              </div>
                <img src="./download.png"></img>
            </div>
            <div className="photoitem">
              <div className="photodetail">
                <img src="https://tse1.mm.bing.net/th?id=OIP.GFwo2CkHWgAieK4ZNF0pZgHaE8&pid=Api&P=0&h=180"></img>
                <span>Name</span>
              </div>
                <img src="./download.png"></img>
            </div>
          </div>
        </div>
        <div className="options">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png"></img>
          </div>
        </div>
        <button onClick={handleBlock}>{isCurrentUserBlocked?"You are Blocked!":isReceiverBlocked ? "User Blocked":"Block User"}</button> 
        <button className='logout'onClick={()=>{
          auth.signOut();
        }}>Logout</button>
      </div>
    </p>
  );
}
export default Details;
