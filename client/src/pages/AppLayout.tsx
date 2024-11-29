import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid } from '@mui/material';

import { Post } from '../contexts/PostContext';

import { usePostContext } from '../hooks/usePostContext';
import { useAxiosPrivate } from '../hooks/useAxiosPrivate';

import Layout from './Layout';

import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import PostCard from '../components/PostCard';
import UserIcon from '../components/UserIcon';
import SearchBar from '../components/SearchBar';

function search(query: string, posts: Post[]): Post[] {
  return query.length > 0
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      )
    : posts;
}

function AppLayout(): JSX.Element {
  const navigate = useNavigate();

  const { posts, isLoading, searchQuery, dispatch, getPostById } =
    usePostContext();
  const axiosPrivate = useAxiosPrivate();

  const searchedPosts = search(searchQuery, posts);

  function handleClickPost(id: number) {
    const clickedPost = posts.find((post) => post.id === id);
    if (clickedPost) {
      navigate(`/blog/${id}`);
      dispatch({
        type: 'SET_CURRENT_POST',
        payload: getPostById(Number(id)) as Post,
      });
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    async function getPosts() {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const res = await axiosPrivate.get('/posts', {
          signal: controller.signal,
        });

        dispatch({ type: 'SET_POSTS', payload: res.data });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }

    getPosts();

    return () => controller.abort();
  }, [axiosPrivate, dispatch]);

  return (
    <Layout excludeFooter={true}>
      <Navbar>
        <UserIcon />
        <SearchBar />
      </Navbar>

      {isLoading ? (
        <Container>
          <Spinner size='100px' />
        </Container>
      ) : (
        <Container maxWidth={'lg'}>
          <Grid container spacing={3}>
            {searchedPosts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                onClickPost={handleClickPost}
              />
            ))}
          </Grid>
        </Container>
      )}
    </Layout>
  );
}

export default AppLayout;
