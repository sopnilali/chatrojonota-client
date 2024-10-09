import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllPosts = () => {

    const [Posts, setPosts] = useState([])
    // Fetching posts from an API

    const getPosts = axios.get(`https://chatrojonota-server.vercel.app/api/myposts/`)
    useEffect(() => {
        getPosts.then(response => {
            setPosts(response.data)
        })
       .catch(error => {})
    },[])

    console.log(Posts);
    return (
        <div>
<ul class="grid grid-cols-1 xl:grid-cols-2 gap-y-8 gap-x-6 items-start p-8">
    {Posts ? 
    
    Posts.map((posts, index)=> 
        <li key={posts._id} class="relative flex sm:flex-row md:flex-row flex-col  gap-6 items-start p-4 hover:shadow-md hover:rounded-md hover:duration-300">
    <div class="order-1 sm:ml-6 xl:ml-0">
        <h3 class="mb-1 text-slate-900 font-semibold">
            <span class="mb-1 block text-sm leading-6 text-indigo-500">{posts?.category}</span>{posts?.postTile}
        </h3>
        <div class="prose prose-slate prose-sm text-slate-600">
            <p>{posts?.textcontent.slice(0,100)}...</p>
        </div>
        <Link to={`/post/post-details/${posts._id}`}
            class="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 mt-6"
            href="">Learn
            more<span class="sr-only">, Completely unstyled, fully accessible UI components</span>
            <svg class="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400"
                width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M0 0L3 3L0 6"></path>
            </svg></Link>
    </div>
    <img src={posts?.feature_image} alt="" class="mb-6 shadow-md rounded-lg bg-slate-50 sm:w-[17rem] sm:mb-0 xl:mb-6 w-full" width="1216" height="640"/>
</li>
    
    )
    
    : "Not Found Content"}



 
</ul>
        </div>
    );
};

export default AllPosts;