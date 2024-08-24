import React from "react";
import "./login.css"; 
import { useState } from "react";
import { toast } from "react-toastify";
import { CollectionReference } from "firebase/firestore"; 
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth"; 
import {auth,db} from "../../lib/firebase.js" ;
import {doc,setDoc} from "firebase/firestore"; 
import upload from "../../lib/upload.js";

function Login() { 

    const[avatar,setAvatar]=useState({
        file:"",
        url:""
    })  

    const [loading,setloading]=useState(false);

    async function handleLogin(e){
        e.preventDefault();  
        setloading(true);  
        const formdata=new FormData(e.target);

        const {username,email,password}=Object.fromEntries(formdata); 
        try{

          const res=await signInWithEmailAndPassword(auth,email,password); 
          toast.success("You are successfully logged in");
        }catch(err){
          console.log(err);
          toast.error(err.message); 
          
        }finally{
          setloading(false)
        }
        
    }

    async function handleRegister(e){
        e.preventDefault(); 
        setloading(true) 
        const formdata=new FormData(e.target);

        const {username,email,password}=Object.fromEntries(formdata); 
        console.log(username); 
        console.log(password);
        console.log(email);  
        try{ 
          const res=await createUserWithEmailAndPassword(auth,email,password);  
          const imgurl=await upload(avatar.file); 
          await setDoc(doc(db, "users", res.user.uid), {
            username:username,
            email:email,
            id:res.user.uid, 
            avatar:imgurl,
            blocked:[],
          });  

          await setDoc(doc(db, "userchats", res.user.uid), {
            chats:[]
          }); 

          toast.success("Account Created! You can login now");

        }catch(e){
          console.log(e);
          toast.error(e.message);
        }finally{
          setloading(false);
        }

    }

    function handleAvatar(e){
        if(e.target.files[0]){ 
            console.log(e)
            setAvatar({
                file:e.target.files[0],
                url:URL.createObjectURL(e.target.files[0])
            })
        }
    }
  return (
    <div className="login">
      <div className="item">
        <h2>Welcome Back</h2>
        <form className="form" onSubmit={handleLogin}>
          <input type="text" placeholder="Username" name="username"></input>
          <input type="email" placeholder="email" name="email"></input>
          <input type="password" placeholder="Password" name="password"></input>
          <button disabled={loading}>{loading ?"Loading":"Sign In"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create a new account</h2>
        <form className="form" onSubmit={handleRegister}>
          <label for="file" style={{ color: "white" }}> 
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload file
          </label>
          <input type="file" id="file" style={{ display: "None" }} onChange={handleAvatar}></input>
          <input type="text" placeholder="Username" name="username"></input>
          <input type="email" placeholder="email" name="email"></input>
          <input type="password" placeholder="Password" name="password"></input> 

          <button disabled={loading}>{loading ?"Loading":"Sign Up"}</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
