import { create } from 'zustand';
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebase';
import useUserStore from './userStore'; 



const useChatStore = create((set) => ({
  chatId:null,  
  user:null,
  isLoading:true, 
  setCurrentUser: (user) => set({ currentUser: user }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  changeChat:async(chatId,user)=>{
   const currentUser=useUserStore.getState().currentUser; 
   if ( user.blocked.includes(currentUser.id)){
    return set({
        chatId,
        user:null,
        isCurrentUserBlocked:true, 
        isReceiverBlocked:false
    })
   }

   else if (currentUser.blocked.includes(user.id)){
    return set({
        chatId,
        user:user,
        isCurrentUserBlocked:false, 
        isReceiverBlocked:true
    })
   } else{
    return set({
        chatId,
        user,
        isCurrentUserBlocked:false,
        isReceiverBlocked:false
    })
   }


  
  },
  changeBlock:()=>{
    set(state=>{
       ({...state,isReceiverBlocked:!state.isReceiverBlocked})
    })
}

})) 


export default useChatStore