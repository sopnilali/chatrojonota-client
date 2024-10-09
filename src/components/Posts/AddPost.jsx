import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

const AddPost = () => {

    const { register, handleSubmit, reset} = useForm();

    const navigate = useNavigate();

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

    const {user} = useAuth();


const handlePostSubmit = async(data) => {


    const feature_image = {image:data.featureImage[0]}

      const result = await axios.post(image_hosting_api, feature_image, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      })
      if(result.data.success){
        const postTile = data.postTile;
        const textcontent = data.textcontent
        const category = data.category
        const feature_image = result.data.data.display_url
        const UserId = user.email
        const UserData = {postTile, textcontent, category, feature_image, UserId};

        axios.post('https://chatrojonota-server.vercel.app/api/myposts', UserData)
        .then(res => {
             console.log(res.data);
             navigate('/user/my-posts');
         })

      }

   

    reset({ postTile:"", textcontent:"", category:"", featureImage:""});
}


    return (
        <div>
           <section className=" dark:bg-gray-100 dark:text-gray-900">
	<form onSubmit={handleSubmit(handlePostSubmit)} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
		<fieldset className="grid gap-6  rounded-md shadow-sm dark:bg-gray-50">
			<div className="space-y-2 col-span-full lg:col-span-2">
				<p className="font-medium">Add the new post</p>
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full ">
					<label htmlFor="postTile" className="text-sm">Post Title</label>
					<input id="postTile" {...register('postTile', {required: true})} type="text" placeholder="Post Title" className="w-full input input-bordered rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
                <div className='col-span-full'>
                    <label htmlFor="textcontent" className="text-sm">Full Content </label>
                    <textarea {...register('textcontent', {required: true})} className="textarea textarea-bordered w-full h-24 focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" placeholder="Bio"></textarea>
                </div>
                
				<div className="col-span-full ">
					<label htmlFor="category" className="text-sm">Select Category</label> <br />
					<select id='category' className="select select-bordered w-full " {...register('category')} defaultValue={'hello'}>
                        <option disabled selected>Select Category</option>
                        <option>News</option>
                        <option>Music</option>
                    </select>
				</div>
                <div className='col-span-full'>
                    <label htmlFor="imagefile" className="text-sm">Feature Image</label>
                    <input id="imagefile" {...register('featureImage', {required: true})} type="file" placeholder="Author Name" className="w-full file file-input rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                </div>
			</div>
            
		</fieldset>
        <div className="flex justify-center">
            <button type="submit" className="btn btn-primary">Add Post</button>
        </div>
	</form>
</section>
        </div>
    );
};

export default AddPost;