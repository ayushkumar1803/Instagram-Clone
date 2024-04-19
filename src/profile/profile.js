import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByUsername } from "../functions/firebase";
import Header from "../component/Header";
import UserProfile from './index'

export default function Profile(){
    const {username} =useParams();
   // console.log('username',username);
   //const [userExists, setUserExists]= useState(false);
   const [user, setUser]= useState(null);
   const navigate= useNavigate();

   useEffect(()=>{

    document.title= `Profile - ${username}`;

    async function checkUserExists(){
        const [user]= await getUserByUsername(username);
        if(user.userId){
            setUser(user);
           // setUserExists(true);
        }
        else{
            //setUserExists(false);
            navigate('/not-found');
        }
    }
    checkUserExists();
    //console.log('user',user.fullName);
   },[username, navigate])

    return user?.username?(
        <div className="bg-gray-background">
            <Header/>
            <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user}/> 
        
            </div>
        </div>
    ):null;
}