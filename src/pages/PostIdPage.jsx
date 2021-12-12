import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import PostService from '../API/PostService'
import Loader from 'react-loader-spinner'

function PostIdPage (props) {
  const params = useParams()
  const [post, setPost] = useState({})
  const [com, setCom] = useState([])


  const [fetchById, isLoading, error] = useFetching(async () =>{
    const response = await PostService.getId(params.id)
    setPost(response.data)
  });

  const [getCom, isComLoading, comError] = useFetching(async () =>{
    const response = await PostService.getCom(params.id)
    setCom(response.data)
  })

  useEffect(() =>{
    fetchById(params.id)
    getCom(params.id)
  }, [])

  return (
    <div>
      {isLoading
        ? <Loader/>
        :<div>{post.id}. {post.title}</div>
      }
      <h2>Comms</h2>
      {isComLoading
      ? <Loader/>
      : <div>{com.map(com =>{
        return (
          <div key={com.id} style={{'margin-top':'20px'}}>
            <h5>{com.name}</h5>
            <div>{com.email}</div>
            <div>{com.body}</div>
          </div>
        )
        })}</div>
      }

    </div>
  )
}

export default PostIdPage