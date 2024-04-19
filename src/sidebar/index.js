import React from 'react'
import User from "./User";
import Suggestions from './Suggestions'
import LoggedInUserContext from "../context/LoggedInUser";
import { useContext } from "react";
import useUser from "../hooks/use-user";

export default function Sidebar(){
 const {user:{username,fullName,userId,docId,following}} =useUser();
 console.log('username',username);
 console.log('fullName',fullName);
 console.log('userId',userId);
console.log('following',following);
console.log('docId',docId);
  return (
    <div className="p-4">
     
      <User username={username} fullName={fullName}/>
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
  

    </div>

  );
}

