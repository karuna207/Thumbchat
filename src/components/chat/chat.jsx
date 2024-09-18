import React, { useState, useRef, useEffect } from "react";
import "./chat.css"; 
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"; 
import { db } from "../../lib/firebase"; 
import useChatStore from "../../lib/chatStore";
import useUserStore from "../../lib/userStore";
import upload from "../../lib/upload";

function Chat() { 
    const [open, setOpen] = useState(false);  
    const [text, setText] = useState("");  
    const [chat, setChat] = useState(""); 
    const [img, setImg] = useState({ file: null, url: "" });
    const endRef = useRef(null);  

    const { currentUser } = useUserStore();
    const { chatId, user,isCurrentUserBlocked,isReceiverBlocked } = useChatStore();

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat?.messages]); // Ensure scrolling on new messages

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            setChat(res.data());
        });

        return () => unSub();
    }, [chatId]);

    const handleOpen = () => setOpen(prev => !prev);  

    const handleEmoji = (e) => {
        setText(prev => prev + e.emoji); 
        setOpen(false);
    }; 

    const handleImg = (e) => {
        if (e.target.files[0]) { 
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    };

    const handleSend = async () => {
        if (text.trim() === '') {
            return;
        } 

        let imgUrl = null;

        try { 
            if (img.file) {
                imgUrl = await upload(img.file);
                console.log("Uploaded image URL:", imgUrl); // Debugging statement
            }
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id, 
                    text, 
                    createdAt: new Date(),
                    ...(imgUrl ? { img: imgUrl } : {}) 
                })
            }); 

            const userids = [currentUser.id, user.id];

            userids.forEach(async (id) => {
                const userChatsRef = doc(db, 'userchats', id);
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();
                    const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId); 

                    if (chatIndex !== -1) {
                        userChatsData.chats[chatIndex].lastMessage = text;
                        userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
                        userChatsData.chats[chatIndex].updatedAt = Date.now(); 

                        await updateDoc(userChatsRef, {
                            chats: userChatsData.chats,
                        });
                    }
                }
            });

            setText("");
            setImg({ file: null, url: "" });
            
        } catch (err) { 
            console.log("Error sending message:", err); // Debugging statement
        }
    };

    return (
        <div className="chat">
            <div className="top">
                <div className="user"> 
                    <img src="./avatar.png" alt="User Avatar" /> 
                    <div className="text"> 
                        <span>Name</span>
                        <p>Lorem ipsum, dolor sit eat accusantium numquam reiciendis voluptate atque dolores officia velit et, natus molestiae eos eligendi!</p>            
                    </div>       
                </div>  
                <div className="icons">
                    <img src="./phone.png" alt="Phone" />
                    <img src="./video.png" alt="Video" />
                    <img src="./info.png" alt="Info" />
                </div>
            </div> 
            <div className="center">
                {chat?.messages?.map((message) => (
                    <div className={`message ${message.senderId === currentUser.id ? "own" : ""}`} key={message.createdAt}>
                        <div className="text">
                            {message.img && <img src={message.img} alt="Message attachment" />} 
                            <p>{message.text}</p>
                        </div>
                    </div>
                ))}
                {img.url && (
                    <div className="message own"> 
                        <div className="text">
                            <img src={img.url} alt="Uploaded" />
                        </div>
                    </div>
                )}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons"> 
                    <label htmlFor="file">
                        <img src="./img.png" alt="Upload" />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={handleImg} />
                    <img src="./camera.png" alt="Camera" />
                    <img src="./mic.png" alt="Mic" />
                </div> 
                <input 
                    className='getinput' 
                    type='text' 
                    value={text} 
                    placeholder={(isCurrentUserBlocked||isReceiverBlocked)?"You cannot send a message":"Type a message"} 
                    onChange={(e) => setText(e.target.value)} 
                    disabled={isCurrentUserBlocked||isReceiverBlocked}
                />
                <div className="emoji">
                    <img src="./emoji.png" alt="Emoji" onClick={handleOpen} />  
                    {open && (
                        <div className="picker">
                            <EmojiPicker onEmojiClick={handleEmoji} />
                        </div>
                    )}
                </div>
                <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked||isReceiverBlocked}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
