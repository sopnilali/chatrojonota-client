import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../hook/useAuth';

const MyPost = () => {

  const {user }= useAuth();

  const [data, setData] = useState([]);

  const Myposts = axios.get(`https://chatrojonota-server.vercel.app/api/myposts/${user?.email}`, { withCredentials: true })
  useEffect(() => {
    Myposts.then(response => setData(response.data));
  }, []);

  const handleDelete = (_id)=>{
    fetch(`https://chatrojonota-server.vercel.app/api/myposts/${_id}`, {
        method: 'DELETE',
    })
    .then((res) => res.json())
    .then(data => {
      if( data.deletedCount > 0 ) {
        Swal.fire('Posts deleted successfully')
        const remaining = data.filter(post => post._id!== _id)
        setData(remaining);
      }
    })
}

  console.log(data);
  
    return (
        <div class="flex flex-col overflow-x-auto">
  <div class="sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-x-auto">
        <table
          class="min-w-full text-start text-sm font-light text-surface dark:text-white">
          <thead
            class="border-b border-neutral-200 font-medium dark:border-white/10">
            <tr>
              <th scope="col" class="px-6 py-4">S/N</th>
              <th scope="col" class="px-6 py-4">Post Title</th>
              <th scope="col" class="px-6 py-4">Description</th>
              <th scope="col" class="px-6 py-4">Category</th>
              <th scope="col" class="px-6 py-4">Image</th>
              <th scope="col" class="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length ? data.map((mypost, index)=> 
            <tr class="border-b border-neutral-200 dark:border-white/10">
            <td class="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
            <td class="whitespace-nowrap px-6 py-4"><Link to={`/post/post-details/${mypost._id}`}>{mypost?.postTile}</Link></td>
            <td class="whitespace-nowrap px-6 py-4">{mypost?.textcontent.slice(0,20)}</td>
            <td class="whitespace-nowrap px-6 py-4">{mypost?.category}</td>
            <td class="whitespace-nowrap px-6 py-4">
            <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={mypost?.feature_image} alt=""/>
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              <div className='text-center'>
                <button className='btn btn-accent mr-2 btn-sm'>Edit</button>
                <button onClick={()=> handleDelete(mypost._id)} className='btn btn-warning btn-sm'>Delete</button>
              </div>
            </td>
          </tr>
            ) : <h2 className='text-4xl'>No Data....</h2>}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    );
};

export default MyPost;