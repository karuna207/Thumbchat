import React, { useState } from "react";  
import "./addUser.css";
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import useUserStore from "../../../../lib/userStore";
function AddUser(){ 
    const [user,setUser]=useState(null); 
    const {currentUser} =useUserStore();
    const handleSearch= async (e)=>{ 
        
        e.preventDefault();
        const formdata=new FormData(e.target);
        const username =formdata.get("username")  
        console.log("username"+username);
        try{ 
        

            const userRef = collection(db, "users");

            // Create a query against the collection.
            const q = query(userRef, where("username", "==", username));
            const querySnapshot=await getDocs(q); 
            console.log(querySnapshot);
            if(querySnapshot){
                setUser(querySnapshot.docs[0].data());
            } 
            console.log("user:",user);


        }catch(err){
            console.log(err);
        }
    }
    console.log(user); 

    const handleAdd=async()=>{ 
        const chatRef=collection(db,"chats");
        const userChatsRef=collection(db,"userchats")
        try{
            const newChatRef=doc(chatRef);
            await setDoc(newChatRef,{
                createdAt:serverTimestamp(),
                messages:[]
            }) 
            console.log(newChatRef.id); 

            await updateDoc(doc(userChatsRef,user.id),{
                chats:arrayUnion(
                    {
                        chatId:newChatRef.id,
                        lastMessage:"",
                        receiverId:currentUser.id,
                        updatedAt:Date.now(),
                    }
                ),
            });
            await updateDoc(doc(userChatsRef,currentUser.id),{
                chats:arrayUnion(
                    {
                        chatId:newChatRef.id,
                        lastMessage:"",
                        receiverId:user.id,
                        updatedAt:Date.now(),
                    }
                ),
            });

        }catch(err){
            console.log(err);
        }

    }
    return <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type='text' placeholder="Username" name="username"/> 
                <button>Search</button>
            </form> 
            {user && <div className='user'>
                    <div className='detail'>
                        <img src={user.avatar||"./avatar.png"}/>  
                        <span>{user.username}</span>   
                    </div> 
                    <button onClick={handleAdd}>Add User</button>
            </div>}
    </div>
}
export default AddUser;