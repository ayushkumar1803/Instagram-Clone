import React, { useContext } from 'react'
import LoggedInUserContext from '../context/LoggedInUser'
import Skeleton from 'react-loading-skeleton';
import UseUser from '../hooks/use-user';

import usePhotos from '../hooks/use-photos'
import Post from '../Post/index';

export default function Timeline(){

//  const {user}= useContext(LoggedInUserContext);

//  const {user:{following}}=UseUser();
 // console.log('following',following);
  const {photos}= usePhotos();
  console.log('photos',photos);

  return(
    <div className='container col-span-2'>
      {!photos?(
        <>
       
      <Skeleton count={4} width={200} height={500} className="mb-4"/>
      
        </>
      ):photos?.length>0?(
        photos.map((content)=> <Post key={content.docId} content={content} />)
      ):(
        <p className='text-center text-2xl'>Follow people to see photos</p>
      )}
    </div>
  ); 
}
