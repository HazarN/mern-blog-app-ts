import { createContext, useReducer } from 'react';

import { usePostContext } from '../hooks/usePostContext';

interface ModalState {
  isEditModalOpen: boolean;
  editedTitle: string;
  editedContent: string;
}
type ModalAction =
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'EDIT_TITLE'; payload: string }
  | { type: 'EDIT_CONTENT'; payload: string };

interface ModalContextValue {
  isEditModalOpen: boolean;
  editedTitle: string;
  editedContent: string;

  dispatch: React.Dispatch<ModalAction>;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleEditPost: () => void;
}

function reducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, isEditModalOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, isEditModalOpen: false };
    case 'EDIT_TITLE':
      return { ...state, editedTitle: action.payload };
    case 'EDIT_CONTENT':
      return { ...state, editedContent: action.payload };
  }
}

const ModalContext = createContext<ModalContextValue | null>(null);

function ModalProvider({ children }: { children: React.ReactNode }) {
  const { currentPost, updatePost } = usePostContext();
  const initialState: ModalState = {
    isEditModalOpen: false,
    editedTitle: currentPost?.title || '',
    editedContent: currentPost?.content || '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isEditModalOpen, editedTitle, editedContent } = state;

  function handleOpenModal() {
    dispatch({ type: 'OPEN_MODAL' });
  }

  function handleCloseModal() {
    dispatch({ type: 'CLOSE_MODAL' });
  }

  function handleEditPost() {
    // Save changes
    if (editedTitle && editedContent) {
      updatePost({
        ...currentPost,
        title: editedTitle,
        content: editedContent,
      });
      handleCloseModal();
    }
  }

  return (
    <ModalContext.Provider
      value={{
        isEditModalOpen,
        editedTitle,
        editedContent,
        dispatch,
        handleOpenModal,
        handleCloseModal,
        handleEditPost,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };
