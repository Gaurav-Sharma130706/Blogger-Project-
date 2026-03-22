import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config.service"
import { Container, PostCard } from "../components";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => { }, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })

    return (
        <div className="w-full py-8">
            <Container>
                <div style={{
                    columnCount: 4,
                    columnGap: '1rem',
                }}>
                    {posts.map((post) => (
                        <div key={post.$id} style={{
                            breakInside: 'avoid',
                            marginBottom: '1rem',
                        }}>
                            <PostCard {...post} />
                        </div>
                    ))}{/*Here in the callback we use parenthesis since we wont use return statement to return if we used{} than we would have had to use return */}
                </div>
            </Container>
        </div>
    )
} {/*Here in the callback we use parenthesis since we wont use return statement to return if we used{} than we would have had to use return */ }

export default AllPosts