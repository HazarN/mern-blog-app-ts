import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

import { useModalContext } from '../hooks/useModalContext';

function AddModal(): JSX.Element {
  const {
    isAddModalOpen,
    modalTitle,
    modalContent,
    dispatch,
    handleCloseAddModal,
    handleAddPost,
  } = useModalContext();

  return (
    <Dialog open={isAddModalOpen} onClose={handleCloseAddModal}>
      <DialogTitle>Add Post</DialogTitle>
      <DialogContent>
        <TextField
          label='Title'
          fullWidth
          margin='normal'
          value={modalTitle}
          onChange={(e) =>
            dispatch({ type: 'EDIT_TITLE', payload: e.target.value })
          }
        />
        <TextField
          label='Content'
          fullWidth
          multiline
          rows={4}
          margin='normal'
          value={modalContent}
          onChange={(e) =>
            dispatch({ type: 'EDIT_CONTENT', payload: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button variant={'outlined'} onClick={handleCloseAddModal}>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={handleAddPost}
          disabled={!modalTitle || !modalContent} // Disable button if fields are empty
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddModal;
