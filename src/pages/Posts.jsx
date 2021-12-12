import React, { useEffect, useRef, useState } from 'react'

import '../style/main.css'
import PostList from '../component/PostList';
import PostForm from '../component/PostForm';
import Postfilter from '../component/Postfilter'
import MyModal from '../component/MyModal/MyModal'
import MyButton from '../component/UI/Button/MyButton'
import { usePosts } from '../hooks/usePosts'
import PostService from '../API/PostService'
import Loader from 'react-loader-spinner'
import { useFetching } from '../hooks/useFetching'
import { useObserver } from '../hooks/useObserver'
import { getPageCount } from '../utils/pages'
import Pagination from '../component/UI/pagination/Pagination'
import MySelect from '../component/UI/Select/MySelect'


function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const lastElement = useRef()



  const [fetchPost, isPostLoading, postError] = useFetching(async (limit, page) =>{
    const response = await PostService.getAll(limit, page)
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

useObserver(lastElement, page < totalPages, isPostLoading, () =>{
  setPage(page + 1)
})

  useEffect(() =>{
    fetchPost(limit, page)
  }, [page, limit])


  const createPost = (newPost) =>{
    setPosts([...posts, newPost])
    setModal(false)
  }
  const removePost = (post) =>{
    setPosts(posts.filter(item => item.id !== post.id))
  }

  const changePage = (page) =>{
    setPage(page);
  }

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>

      <Postfilter filter={filter} setFilter={setFilter}/>
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue='Количество элементов на странице'
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Показать все'},
        ]}
      />
      { postError &&
      <h1>Ошибка {postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов 1'}/>
      <div ref={lastElement} style={{heigth: 20, backgroundColor: 'red'}}></div>
      {isPostLoading &&
      <div style={{ display: 'flex', justifyContent: 'center' }}><Loader type="Puff" color="#00BFFF" height={80} width={80}/></div>
      }

      <Pagination page={page} changePage={changePage} totalPages={totalPages}/>

    </div>
  );
}

export default Posts;
