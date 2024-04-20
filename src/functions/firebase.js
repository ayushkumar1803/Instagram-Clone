import { firebase,FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {

    const result = firebase.firestore().collection('users').where('username','==', username).get();

    //console.log(result);
    return (await result).docs.map((user)=> user.data().length>0);  // returns an array with a boolean value
   
}

//This particular is used to return the user information by utilizing the userId of the particular user...

export async function getUserByUserId(userId){
  const result = firebase.firestore().collection('users').where('userId','==',userId).get();
  const user= (await result).docs.map(item=>({
    ...item.data(),
    docId:item.id
  }));
  return user;
}

export async function getSuggestedProfiles(userId, following){

  const result= await firebase.firestore().collection('users').limit(10).get();
  return result.docs.map((user)=>({...user.data(),docId: user.id}))
  .filter((profile)=> profile.userId !== userId && !following.includes(profile.userId));


 /* let query= firebase.firestore().collection('users');
  if(following.length>0){
    query=query.where('userId','not-in',[...following,userId]);
  }
  else{
    query=query.where('userId','!=',userId);
  }
  const result= await query.limit(10).get();
  const profiles= result.docs.map((profile)=>({
    ...profile.data(),
    docId:profile.id
  }));
  //console.log('profiles',profiles);
  return profiles;
  */
 
}

//Here this function is used to increment the following of the current user when it follows someone and also decrement the following when it unfollows someone...

export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId, isFollowingProfile){
  return firebase.firestore().collection('users').doc(loggedInUserDocId).update({
    following: isFollowingProfile? FieldValue.arrayRemove(profileId): FieldValue.arrayUnion(profileId)
  });
}

//Here this function is used to increment the followers of the another user followed by the current user and also decrement the followers of the another user when the current user unfollow them..

export async function updateFollowedUserFollowers(profileDocId, loggedInUserDocId, isFollowingProfile){
  return firebase.firestore().collection('users').doc(profileDocId).update({
    followers: isFollowingProfile? FieldValue.arrayRemove(loggedInUserDocId): FieldValue.arrayUnion(loggedInUserDocId)
  });
}

//Here this funciton is used to search the user by the username..

export async function getUserByUsername(username){
   const result = await firebase.firestore().collection('users').where('username','==',username.toLowerCase()).get();

   return result.docs.map((item)=>({
    ...item.data(),
    docId: item.id
   }));
}



export async function getPhotos(userId, following){
  const result= await firebase.firestore().collection('photos').where('userId','in',following).get();

  const userFollowedPhotos= result.docs.map(photo => ({...photo.data(), docId: photo.id}));
  console.log('userFollowedPhotos', userFollowedPhotos);
  const photosWithUserDetails= await Promise.all(
    userFollowedPhotos.map(async (photo)=>{
      let userLikedPhoto=false;
      if(photo.likes.includes(userId)){
        userLikedPhoto = true;
    }
    const user= await getUserByUserId(photo.userId);
    const {username}= user[0];
    return {username, ...photo, userLikedPhoto};
    })
  );
  return photosWithUserDetails;
}

export async function getUserPhotosByUsername(username){
  const [user]= await getUserByUsername(username);
  //console.log('user',user);
  const result = firebase.firestore().collection('photos').where('userId','==',user.userId).get();
   return (await result).docs.map((item)=>({
    ...item.data(),
    docId: item.id
   }))
}

export async function isUserFollowingProfile(loggedInUsername, profileUserId){
  const result= await firebase.firestore().collection('users')
  .where('username','==',loggedInUsername)
  .where('following','array-contains',profileUserId).get();

  const [response={}]= result.docs.map((item)=>({
    ...item.data(),
    docId: item.id
  }));
  //console.log('response',response);
  return response.userId;
}

export async function toggleFollow(isFollowingProfile, activeUserDocId, profileDocId, profileUserId, followingUserId){
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
  await updateFollowedUserFollowers(profileDocId, followingUserId,isFollowingProfile);

}