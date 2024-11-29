import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Button } from '@mui/material';

import { Post } from '../contexts/PostContext';

import { usePostContext } from '../hooks/usePostContext';
import { useModalContext } from '../hooks/useModalContext';

import Layout from './Layout';

import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import PostCard from '../components/PostCard';
import UserIcon from '../components/UserIcon';
import AddModal from '../components/AddModal';
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

  const { posts, isLoading, searchQuery, dispatch, getPostById, getPosts } =
    usePostContext();
  const { handleOpenAddModal } = useModalContext();

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
    getPosts();
  }, [getPosts]);

  return (
    <Layout excludeFooter={true}>
      <Navbar>
        <UserIcon />
        <SearchBar />
      </Navbar>

      <Container
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          sx={{ margin: '1rem 1rem  0 0' }}
          variant='contained'
          onClick={handleOpenAddModal}
        >
          Add Post
        </Button>
      </Container>

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

      <AddModal />
    </Layout>
  );
}

export default AppLayout;
