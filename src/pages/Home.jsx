import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config.service"
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {

    const [posts, setPosts] = useState([])
    const userData = useSelector(state => state.auth.userData)
    const authStatus = useSelector(state => state.auth.status)
    useEffect(() => {
        if (authStatus) {  // ← only fetch if logged in
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        } else {
            setPosts([])  // ← clear posts when logged out
        }
    }, [authStatus])

    if (posts.length === 0) {
        return (
            <div className="w-full">
                {/* Hero Section */}
                <div className="w-full bg-blue-50 py-20">
                    <Container>
                        <div className="flex flex-col items-center text-center gap-6">
                            <h1 className="text-5xl font-bold text-gray-800">Welcome to Blogger</h1>
                            <p className="text-xl text-gray-500 max-w-xl">A place to read, write and share amazing stories. Join us today!</p>
                            <div className="flex gap-4">
                                <Link to="/signup" className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 duration-200 font-medium">Get Started</Link>
                                <Link to="/login" className="px-8 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 duration-200 font-medium">Login</Link>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="w-full bg-blue-50 py-16">
                <Container>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-4xl font-bold text-gray-800">
                                Welcome back, {userData?.name}! 👋
                            </h1>
                            <p className="text-gray-500">
                                {posts.length} {posts.length === 1 ? 'post' : 'posts'} in the community
                            </p>
                        </div>
                        <Link
                            to="/add-post"
                            className="px-8 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 duration-200 font-medium"
                        >
                            + Add Post
                        </Link>
                    </div>
                </Container>
            </div>

            {/* Posts Grid */}
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
                        ))}
                    </div>
                </Container>
            </div>
        </div>

    )


}

export default Home