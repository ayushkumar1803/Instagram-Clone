import React, { useRef } from "react"
import PropTypes from 'prop-types'
import Header from "./header";
import Image from "./image";
import Actions from "./actions";
import Footer from "./footer";
import Comments from "./comments";

export default function Post({content}){

    const commentInput= useRef(null);
    const handleFocus= ()=> commentInput.current.focus();

    //console.log('content',content);

    //Now we have to implement the Header , image, actions (like , comment), footer things in the post section.
    
    return(
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-10">
            <Header username={content.username} />
            <Image src={content.imageSrc} caption={content.caption} />
            <Actions 
            docId={content.docId}
            totalLikes={content.likes.length}
            likedPhoto={content.userLikedPhoto}
            handleFocus={handleFocus}
        />
        <Footer caption={content.caption} username={content.username} />
        <Comments docId={content.docId} comments={content.comments}  posted={content.dateCreated} commentInput={commentInput} />
        </div>

    )
        
}

Post.propTypes={
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc:PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments:PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired
    })
};