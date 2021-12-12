import React, { useState } from 'react';
import MyInput from './UI/Input/MyInput';
import MyButton from './UI/Button/MyButton';

function PostForm({create}){
    const[post, setPost] = useState({title: '', body: ''})

    const addNewsPost = (e) =>{
        e.preventDefault();
        const newPost = {
            ...post,
            id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: ''})
      }

    return(
        <div>
           <form action="">
            <MyInput 
            value={post.title}
            type="text" 
            onChange={e => setPost({...post, title: e.target.value})}
            placeholder='Название поста'
            />
            <MyInput 
            value={post.body}
            type="text"
            placeholder='Описание поста'
            onChange={e => setPost({...post, body: e.target.value})}
            />
            <MyButton onClick={addNewsPost}>
            Создать пост
            </MyButton>
        </form>
        </div>
    );
}

export default PostForm