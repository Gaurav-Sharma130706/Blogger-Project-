import React from "react";
import appwriteService from "../appwrite/config.service"
import { Link } from "react-router-dom";

function PostCard({$id, title, featuredImage}){
    return(
         <Link to={`/post/${$id}`}>                         {/*we have done this to make the whole card clickable , link ki khas baat yeh hai ki link ko apan ko puri url nhi deni padhti instead current position se kahan jana voh bhi de sakte hain*/}
         <div className="w-full bg-gray-100 rounded-xl p-4">
            <div className="w-full justify-center mb-4">
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}  className="rounded-xl"/>
            </div>
            <h2 className="text-xl font-bold">{title}</h2>
         </div>
        </Link>
    )
}

export default PostCard