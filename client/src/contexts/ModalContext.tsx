import { createContext, useReducer } from 'react';

import { usePostContext } from '../hooks/usePostContext';

interface ModalState {
  isEditModalOpen: boolean;
  isAddModalOpen: boolean;
  modalTitle: string;
  modalContent: string;
}
type ModalAction =
  | { type: 'OPEN_EDIT_MODAL' }
  | { type: 'CLOSE_EDIT_MODAL' }
  | { type: 'OPEN_ADD_MODAL' }
  | { type: 'CLOSE_ADD_MODAL' }
  | { type: 'EDIT_TITLE'; payload: string }
  | { type: 'EDIT_CONTENT'; payload: string };

interface ModalContextValue {
  isEditModalOpen: boolean;
  isAddModalOpen: boolean;
  modalTitle: string;
  modalContent: string;

  dispatch: React.Dispatch<ModalAction>;
  handleOpenEditModal: () => void;
  handleOpenAddModal: () => void;
  handleCloseEditModal: () => void;
  handleCloseAddModal: () => void;
  handleEditPost: () => void;
  handleAddPost: () => void;
}

function reducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'OPEN_EDIT_MODAL':
      return { ...state, isEditModalOpen: true };
    case 'CLOSE_EDIT_MODAL':
      return { ...state, isEditModalOpen: false };
    case 'OPEN_ADD_MODAL':
      return { ...state, isAddModalOpen: true };
    case 'CLOSE_ADD_MODAL':
      return { ...state, isAddModalOpen: false };
    case 'EDIT_TITLE':
      return { ...state, modalTitle: action.payload };
    case 'EDIT_CONTENT':
      return { ...state, modalContent: action.payload };
  }
}

const ModalContext = createContext<ModalContextValue | null>(null);

function ModalProvider({ children }: { children: React.ReactNode }) {
  const { currentPost, updatePost, addPost } = usePostContext();
  const initialState: ModalState = {
    isEditModalOpen: false,
    isAddModalOpen: false,
    modalTitle: currentPost?.title || '',
    modalContent: currentPost?.content || '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { modalTitle, modalContent } = state;

  function handleOpenEditModal() {
    dispatch({ type: 'OPEN_EDIT_MODAL' });
  }
  function handleCloseEditModal() {
    dispatch({ type: 'CLOSE_EDIT_MODAL' });
  }
  function handleOpenAddModal() {
    dispatch({ type: 'OPEN_ADD_MODAL' });
  }
  function handleCloseAddModal() {
    dispatch({ type: 'CLOSE_ADD_MODAL' });
  }

  function handleEditPost() {
    // Save changes
    if (modalTitle && modalContent) {
      updatePost({
        ...currentPost,
        title: modalTitle,
        content: modalContent,
      });
      handleCloseEditModal();
    }
  }

  function handleAddPost() {
    if (modalTitle && modalContent) {
      const newPost = {
        title: modalTitle,
        content: modalContent,
      };

      addPost(newPost);
      handleCloseAddModal();
    }
  }

  return (
    <ModalContext.Provider
      value={{
        ...state,
        dispatch,
        handleOpenEditModal,
        handleOpenAddModal,
        handleCloseEditModal,
        handleCloseAddModal,
        handleEditPost,
        handleAddPost,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };
