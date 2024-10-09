import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const AddCategory = () => {

    const { register, handleSubmit, reset} = useForm();

    const handlePostSubmit = (data) => {
    
        
        const postTile = data.catagory_name;
        const textcontent = data.category_url
        const category = data.cat_content
    
        const image_file = {image:data.cat_image[0]}
    
    
        const UserData = { postTile, category, textcontent, image_file};
        console.log(UserData);
    
        // axios.post('/api/add-post', UserData)
        // .then(res => {
        //      console.log(res.data);
        //  })
    
        reset({ catagory_name:"", category_url:"", cat_content:"", cat_image:""});
    }


    return (
        <div>
           <section className=" dark:bg-gray-100 dark:text-gray-900">
	<form onSubmit={handleSubmit(handlePostSubmit)} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
		<fieldset className="grid gap-6  rounded-md shadow-sm dark:bg-gray-50">
			<div className="space-y-2 col-span-full lg:col-span-2">
				<p className="font-medium">Add the new Category</p>
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full ">
					<label htmlFor="postTile" className="text-sm">Name</label>
					<input id="postTile" {...register('catagory_name', {required: true})} type="text" placeholder="Category Name" className="w-full input input-bordered rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
                <div className='col-span-full'>
                    <label htmlFor="textcontent" className="text-sm">Slug</label>
					<input id="postTile" {...register('category_url', {required: true})} type="text" placeholder="Category URL..." className="w-full input input-bordered rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />

                </div>
                
				<div className="col-span-full ">
					<label htmlFor="category" className="text-sm">Description</label> <br />
                    <textarea {...register('cat_content', {required: true})} className="textarea textarea-bordered w-full h-24 focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" placeholder="Description..."></textarea>

				</div>
                <div className='col-span-full'>
                    <label htmlFor="imagefile" className="text-sm">Category Icon</label>
                    <input id="imagefile" {...register('cat_image', {required: true})} type="file" placeholder="Catagory image" className="w-full file file-input rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                </div>
			</div>
            
		</fieldset>
        <div className="flex justify-center">
            <button type="submit" className="btn btn-primary">Add Category</button>
        </div>
	</form>
</section>
        </div>
    );
};

export default AddCategory;