import { createContext, useReducer } from 'react';

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  lastUpdate: Date;
}

interface PostContextValue {
  posts: Post[];
  searchQuery: string;
  isLoading: boolean;

  dispatch: React.Dispatch<PostAction>;
  getPostById: (id: number) => Post | undefined;
}

interface PostState {
  posts: Post[];
  searchQuery: string;
  isLoading: boolean;
}
interface PostAction {
  type: string;
  payload: Post | Post[] | boolean | string;
}

const initialState: PostState = {
  posts: [],
  searchQuery: '',
  isLoading: false,
};
function reducer(state: PostState, action: PostAction) {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload as Post[],
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

interface PostProviderProps {
  children: React.ReactNode;
}
function PostProvider({ children }: PostProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { posts, isLoading, searchQuery } = state;

  const getPostById = (id: number) =>
    posts.find((post: Post) => post.id === id);

  return (
    <PostContext.Provider
      value={{ posts: posts, isLoading, searchQuery, dispatch, getPostById }}
    >
      {children}
    </PostContext.Provider>
  );
}

export { PostContext, PostProvider };
