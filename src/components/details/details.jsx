import React from "react";
import "./details.css";

function Details() {
  return (
    <p className="details">
      <div className="user">
        <img src="./avatar.png"></img>
        <h2>Jane</h2>
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
        <button>Block user</button>
      </div>
    </p>
  );
}
export default Details;
