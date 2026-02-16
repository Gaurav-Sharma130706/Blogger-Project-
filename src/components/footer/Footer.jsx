import React from "react";
import {Link} from 'react-router-dom'
import Logo from '../Logo' 

function Footer(){
    return(
        <footer className="relative overflow-hidden py-10 bg-white border  border-t-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center ">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    © {new Date().getFullYear()} Blogger
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    Sharing stories, one post at a time ✨
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12 ml-auto">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                                Quick Links
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/all-posts"
                                    >
                                        All Posts
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/add-post"
                                    >
                                        Write a Post
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/about"
                                    >
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                                Connect
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <a
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Twitter
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        href="https://github.com/Gaurav-Sharma130706"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        GitHub
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        href="https://linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        href="mailto:gaurav130706@gmail.com"
                                    >
                                        Email Us
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        </footer>
    )
}

export default Footer
