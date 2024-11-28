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
  isLoading: boolean;

  dispatch: React.Dispatch<PostAction>;
  getPostById: (id: number) => Post | undefined;
}

interface PostState {
  posts: Post[];
  isLoading: boolean;
}
interface PostAction {
  type: string;
  payload: Post | Post[] | boolean;
}

const initialState: PostState = {
  posts: [],
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
  const { posts, isLoading } = state;

  const getPostById = (id: number) =>
    posts.find((post: Post) => post.id === id);

  return (
    <PostContext.Provider
      value={{ posts: posts, isLoading, dispatch, getPostById }}
    >
      {children}
    </PostContext.Provider>
  );
}

export { PostContext, PostProvider };
