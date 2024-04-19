import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton";
import PropTypes from 'prop-types'
import SuggestedProfile from './suggestedProfile'
import { getSuggestedProfiles } from "../functions/firebase";

export default function Suggestions({userId,following,loggedInUserDocId}){

    const [profiles, setProfiles]= useState(null);
    //console.log('profiles',profiles);
    useEffect(()=>{
        async function SuggestedProfiles(){
            const response= await getSuggestedProfiles(userId, following);
            setProfiles(response);
        }
        if(userId)
        SuggestedProfiles();

        console.log('profiles-suggestions',profiles);

    },[userId]);

    return !profiles?(
        <Skeleton count={1} height={110} className="mt-5" />
    ):profiles.length>0?(
        <div className="rounded flex flex-col">
            <div className="text-sm justify-between align-items items-center mb-2 flex">
                <p className="font-bold text-gray-base">Suggestions for you</p>
            </div>
            <div className="mt-4 grid gap-5">
                {profiles.map((profile)=>(
                    <SuggestedProfile 
                    key={profile.docId}
                    profileDocId={profile.docId}
                    username={profile.username}
                    profileId={profile.userId}
                    userId={userId}
                    loggedInUserDocId={loggedInUserDocId}
                    />
                ))}
            </div>
        </div>
    ):null;
}

Suggestions.propTypes={
    userId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string
};