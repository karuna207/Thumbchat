import React from "react"; 
import "./list.css"; 
import Chatlist from "./chatlist/Chatlist.jsx";
import Userinfo from "./userinfo/Userinfo.jsx";

function List(){
    return <div className="list">
        <Userinfo/> 
        <Chatlist/>
    </div>
} 
export default List;