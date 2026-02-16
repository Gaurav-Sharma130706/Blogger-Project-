import React, {useCallback} from "react";  
import { useForm } from "react-hook-form";
import {Button, Input, Select,RTE} from '../index' 
import appwriteService from "../../appwrite/config.service"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({post}){   //watch provides you ability to continiusly watch a particular field
    const {register, handleSubmit, watch, setValue, control, getValues}= useForm({
        defaultValues:{
            title: post?.title ||'',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const navigate= useNavigate()
    const userData= useSelector(state=> state.auth.userData)

    const submit= async(data) =>{
        
        try {
            if(post){   //Matlab user koi already existing post mai changes kar raha hai
                const file= data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null //agar data mai image bhi aayi hai toh upload it on appwrite
                console.log("Uploaded file:", file)
    
                if(file){    //If previous step mai koi file upload hui hai toh delete the previous image
                    await appwriteService.deleteFile(post.featuredImage)
                }
                                                    //Kyunki apne update post method ko 1st argumnet slug chaiye thi and slug apni uss post ki ID hi hoti hai
                const dbPost= await appwriteService.updatePost(post.$id,{...data,featuredImage: file? file.$id: post.featuredImage})
    
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
            
            else{   //Matlab nayi post hi hai and not updating already existing one
                 
                 const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
                 console.log(file)
    
                if(file){
                    const fileId= file.$id 
                    data.featuredImage= fileId
                    const dbPost=await appwriteService.createPost({
                        ...data,
                        userID: userData.$id      //Since jabb bhi apan koi form submit karenge toh uske pass user id nhi hogi but in post we need it
                    })
    
                    if(dbPost){
                        navigate(`/post/${dbPost.$id}`)
                    }
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error)
            alert("Failed to submit post. Please try again.")
        }
    }

    const slugTransform= useCallback((value)=>{
        if(value && typeof value=== 'string'){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]/g, '-') //regex to replace anything other than alphabets, numbers and space by '-'
            .replace(/\s/g,'-')
        }

        return ''
    },[])

    React.useEffect(()=>{
        const subscription= watch((value, {name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title,{shouldValidate:true}))
            }
        })

        return ()=>{
            subscription.unsubscribe()    //It is way to optimize the method called in useEffect, we store the method in a variable and than in return you can unsubscribe it
        }

    },[watch, slugTransform,setValue])

    

    return(
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })} 
                />
                {post && (  
                <div className="w-full mb-4">
                <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                    //Error handling modification 
                    onError={(e) => {  
                    console.error("Image failed to load:", post.featuredImage)
                    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'
                }}
                />
                </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm