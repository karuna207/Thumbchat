import React, { useEffect } from "react" 
import "./index.css" 
import List from "./components/list/list.jsx"  
import Details from "./components/details/details.jsx" 
import Chat from "./components/chat/chat.jsx" 
import Login from "./components/login/login.jsx" 
import {useState} from "react" 
import Notification from "./components/notifications/notifications.jsx"
import { onAuthStateChanged } from "firebase/auth"
import useUserStore from "./lib/userStore.js" 

import {auth,db,storage} from "./lib/firebase.js"
import useChatStore from "./lib/chatStore.js"


 
const App = () => {  
  const{currentUser,isLoading,fetchUserInfo,setCurrentUser,setIsLoading}=useUserStore();
  const { chatId}=useChatStore();
  useEffect(()=>{
    const unsub=onAuthStateChanged(auth,(user)=>{  
      if(user){
      fetchUserInfo(user?.uid);
      console.log(user); 
      }else{
        setCurrentUser(null);
        setIsLoading(false);
      }
    }) 

    return ()=>{
      unsub();
    }
  },[fetchUserInfo])  

  console.log(currentUser);

  if (isLoading) return <div className="loading">Loading ...</div>
  return <div className="container">
    {(currentUser)?<>
      <List/> 
      {chatId && <Chat/>}
      {chatId && <Details/>}
    </>:<Login/>} 
    <Notification/>
  </div>

  
}

export default App