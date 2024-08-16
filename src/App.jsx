import React from "react" 
import "./index.css" 
import List from "./components/list/list.jsx"  
import Details from "./components/details/details.jsx" 
import Chat from "./components/chat/chat.jsx"

 
const App = () => {
  return (
    <div className='container'>
      <List/> 
      <Chat/> 
      <Details/>
    </div>
  )
}

export default App