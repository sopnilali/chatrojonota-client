import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

const PostDetails = () => {

    const {user} = useAuth();
    const { id } = useParams();

    const [data, setData] = useState([])
    const { postTile, textcontent, category, feature_image} = data;
    console.log(postTile);

    // Fetch data from an API using the id
   useEffect(() => {
    axios.get(`https://chatrojonota-server.vercel.app/api/mypost/${id}`, {withCredentials: true})
       .then(res => setData(res.data))
       .catch(err => console.error(err));
   },[])

    console.log(data);

    
    return (
        <div>
            <div class=" mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">

{/* <!-- Post Title --> */}
<h1 class="text-4xl font-bold text-gray-800 mb-4">{postTile}</h1>
{/* <!-- Post Details: Category & Author --> */}
<div class="flex items-center text-gray-500 text-sm pb-3">
    <span>Author: <span class="font-medium text-gray-700 mr-2">{user.displayName}</span></span>
    <span class="bg-blue-100 text-blue-500 py-1 px-3 rounded-full font-semibold">Category: {category}</span>
    
</div>
{/* <!-- Post Description --> */}
<p class="text-gray-600 text-lg mb-6">
    {textcontent}
</p>



</div>
        </div>
    );
};

export default PostDetails;