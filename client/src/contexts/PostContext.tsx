import { createContext, useReducer } from 'react';

import { axiosPrivate } from '../api/axios';

import { useAuthContext } from '../hooks/useAuthContext';

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  lastUpdate: Date;
  author?: {
    id: number;
    name: string;
  };
}
export interface PostUpdateBody {
  title: string;
  content: string;
  lastUpdate: Date;
}

interface PostAuthor {
  id: number;
  name: string;
}

interface PostContextValue {
  posts: Post[];
  currentPost: Post | null;
  searchQuery: string;
  isLoading: boolean;

  dispatch: React.Dispatch<PostAction>;
  getPostById: (id: number) => Post | undefined;
  updatePost: (updatedBody: { title: string; content: string }) => void;
}

interface PostState {
  posts: Post[];
  currentPost: Post | null;
  searchQuery: string;
  isLoading: boolean;
}

type PostAction =
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'SET_CURRENT_POST'; payload: Post | PostUpdateBody }
  | { type: 'SET_POST_AUTHOR'; payload: PostAuthor }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SEARCH_QUERY'; payload: string };

const initialState: PostState = {
  posts: [],
  currentPost: null,
  searchQuery: '',
  isLoading: false,
};
function reducer(state: PostState, action: PostAction): PostState {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload as Post[],
      };
    case 'SET_CURRENT_POST':
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          ...(action.payload as Post | PostUpdateBody),
        } as Post,
      };
    case 'SET_POST_AUTHOR':
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          author: action.payload as { id: number; name: string },
        } as Post,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload as boolean,
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload as string,
      };
    default:
      console.log('Invalid action type');
      return state;
  }
}

const PostContext = createContext<PostContextValue | null>(null);

function PostProvider({ children }: { children: React.ReactNode }) {
  const { userCredentials } = useAuthContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { posts, currentPost, isLoading, searchQuery } = state;

  const getPostById = (id: number) =>
    posts.find((post: Post) => post.id === id);

  async function updatePost(updatedBody: { title: string; content: string }) {
    try {
      if (!userCredentials) throw new Error('User not authenticated');

      const res = await axiosPrivate.put(
        `/posts/${currentPost?.id}`,
        updatedBody,
        { headers: { authorization: `Bearer ${userCredentials.accessToken}` } }
      );

      const postResponse = res.data.updatedPost;
      const authorResponse = res.data.to;

      console.log('Post updated', res.data);
      dispatch({
        type: 'SET_CURRENT_POST',
        payload: {
          title: postResponse.title,
          content: postResponse.content,
          lastUpdate: postResponse.lastUpdate,
          author: authorResponse,
        },
      });
    } catch {
      console.error('Error updating post');
    }
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        currentPost,
        isLoading,
        searchQuery,
        dispatch,
        getPostById,
        updatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export { PostContext, PostProvider };
