import { useContext, useEffect, useState } from "react";
import UserContext from "../context/User";
import { getUserByUserId } from "../functions/firebase";


const UseUser=()=>{
  const [activeUser, setActiveUser] =useState({});
  const {user}= useContext(UserContext);

  useEffect(()=>{
    async function getUserObjByUserId(){
      const [response]= await getUserByUserId(user.uid);
      setActiveUser(response);
    }

    if(user?.uid){
      getUserObjByUserId();
    }
  },[user]);
  //console.log('user',user);
  //console.log('activeUser',activeUser);
  return {user: activeUser};
  
}

export default UseUser;