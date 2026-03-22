import React , {useEffect, useState} from "react";
import appwriteService from "../appwrite/config.service"
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home(){

    const [posts, setPosts] = useState([])
    const authStatus = useSelector(state => state.auth.status) 
     useEffect(()=>{
        if(authStatus){  // ← only fetch if logged in
            appwriteService.getPosts().then((posts)=>{
                if(posts){
                    setPosts(posts.documents)
                }
            })
        } else {
            setPosts([])  // ← clear posts when logged out
        }
    },[authStatus])

    if(posts.length === 0){
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="empty-state">  
                        <h1>Login to read posts</h1>
                        <p>Please login or sign up to view all the amazing posts</p>
                    </div>
                </Container>
            </div>
        )
    }

    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post)=>(
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )


}

export default Home