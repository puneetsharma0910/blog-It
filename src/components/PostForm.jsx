import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import appwriteService from "../appwrite/database";
import { useForm } from "react-hook-form";

function PostForm(post) {
    const navigate = useNavigate()
  const { watch, control, setValues, getValues } = useForm({
    defaultValues: {},
  });

  async function submit(data) {
    if (post) {
      //matlab mai edit karne aaya hu
      const file = (await data.image[0])
        ? appwriteService.uploadFile(data.image)
        : null;
    }
    if (file) {
      appwriteService.deleteFile(post.featuredImage);
    }

    const dbPost = appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage : file ? file.$id : undefined
    })
    if(dbPost){
        navigate('/post/dbPost.$id')
    
    }
  }
  return <div></div>;
}

export default PostForm;
