import { create } from 'zustand'
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebase';


const useUserStore = create((set) => ({
  currentUser:null, 
  isLoading:true, 
  setCurrentUser: (user) => set({ currentUser: user }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  fetchUserInfo:async(uid)=>{
    if(!uid) return set({currentUser:null,isLoading:false});
    try{
       

        const docRef = doc(db, "users", uid); 
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){ 
            set({currentUser:docSnap.data(),isLoading:false})
            console.log("Document Data:",docSnap.data());
        }else{
            set({currentUser:null,isLoading:false})
        }
}
catch(err){
        console.log(err);
        return set({currentUser:null,isLoading:false});
    }
  }

})) 


export default useUserStore