import { useEffect } from 'react';
import { Container, Grid } from '@mui/material';

import { usePostContext } from '../hooks/usePostContext';
import { useAxiosPrivate } from '../hooks/useAxiosPrivate';

import Layout from './Layout';

import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';

function AppLayout(): JSX.Element {
  const { posts, isLoading, dispatch } = usePostContext();
  const axiosPrivate = useAxiosPrivate();

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
        <SearchBar />
      </Navbar>

      {isLoading ? (
        <Container>
          <Spinner size='100px' />
        </Container>
      ) : (
        <Container maxWidth={'lg'}>
          <Grid container spacing={3}>
            {posts.map((post) => (
              <PostCard key={post.id} id={post.id} />
            ))}
          </Grid>
        </Container>
      )}
    </Layout>
  );
}

export default AppLayout;
