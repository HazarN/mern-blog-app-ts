import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { axiosPrivate } from '../api/axios';

import { usePostContext } from '../hooks/usePostContext';

import Layout from './Layout';

import Navbar from '../components/Navbar';
import UserIcon from '../components/UserIcon';
import CLickedPost from '../components/ClickedPost';

function Post(): JSX.Element {
  const { id } = useParams();
  const { dispatch } = usePostContext();

  useEffect(() => {
    const controller = new AbortController();

    async function getPostUser() {
      try {
        const res = await axiosPrivate.get(`/users/post/${id}`, {
          signal: controller.signal,
        });

        dispatch({
          type: 'SET_POST_AUTHOR',
          payload: { id: res.data.id, name: res.data.name },
        });
      } catch (error) {
        console.error(error);
      }
    }

    getPostUser();

    return () => controller.abort();
  }, [id, dispatch]);

  return (
    <Layout>
      <Navbar>
        <UserIcon />
      </Navbar>

      <CLickedPost />
    </Layout>
  );
}

export default Post;
