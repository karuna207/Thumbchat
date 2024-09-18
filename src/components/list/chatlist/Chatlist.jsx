import React, { useEffect, useState } from "react";
import "./chatlist.css";
import AddUser from "./addUser/addUser.jsx";
import useUserStore from "../../../lib/userStore.js";
import useChatStore from "../../../lib/chatStore.js";
import { collectionGroup, CollectionReference, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase.js";
import { updatePassword } from "firebase/auth/web-extension";

function Chatlist() {
  const [chats, setChats] = useState([]);
  const [mode, setMode] = useState(false);
  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore(); 
  

  console.log(chatId);

  function changeMode() {
    setMode((prev) => {
      return !prev;
    });
  }

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);
        setChats(
          chatData.sort((a, b) => {
            b.updatedAt - a.updatedAt;
          })
        );
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);
  console.log(chats);

  const handleSelect = async (chat) => { 
     
    const userChats=chats.map((item)=>{
      const {user,...rest}=item; 
      return rest
    }) 

    const chatIndex=userChats.findIndex((item)=>{
      return item.chatId===chat.chatId;
    }) 

    userChats[chatIndex].isSeen=true;

    const userChatsRef=doc(db,"userchats",currentUser.id); 

    try{

      await updateDoc(userChatsRef,{
        chats:userChats,
      }) 
      changeChat(chat.chatId, chat.user);
    }catch(err){
      console.log(err);

    }
    
  };

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchbar">
          <img src="./search.png"></img>
          <input placeholder="Search" type="text"></input>
        </div>
        <img
          src={mode ? "./minus.png" : "./plus.png"}
          onClick={changeMode}
          className="add"
        ></img>
      </div>

      {chats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => {
            handleSelect(chat);
          }}
          style={{ backgroundColor: chat?.isSeen ? "istransparent" : "blue" }}
        >
          <img src={chat.user.blocked.includes(currentUser.id)?"./avatar.png":chat.user.avatar||"./avatar.png" }></img>
          <div className="texts">
            <span>{chat.user.blocked.includes(currentUser.id)?"User":chat.user.username}</span>
            <p>{chat.lastMessage.substr(0,20)+'...'}</p>
          </div>
        </div>
      ))}
      {mode ? <AddUser /> : null}
    </div>
  );
}

export default Chatlist;
