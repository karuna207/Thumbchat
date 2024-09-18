import React from "react";
import "./userinfo.css";
import useUserStore from "../../../lib/userStore";

function Userinfo() { 

  const {currentUser}=useUserStore();

  return (
    <div className="userinfo">
      <div className="user">
        <img src={currentUser.avatar || "/avatar.png"}></img>
        <h2>{currentUser.username}</h2>
      </div>

      <div className="icons">
        <img src="./more.png"></img>
        <img src="./video.png"></img>
        <img src="./edit.png"></img>
      </div>
    </div>
  );
}

export default Userinfo;
