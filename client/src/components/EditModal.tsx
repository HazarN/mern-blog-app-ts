import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

import { useModalContext } from '../hooks/useModalContext';

function EditModal(): JSX.Element {
  const {
    isEditModalOpen,
    modalTitle,
    modalContent,
    dispatch,
    handleCloseEditModal,
    handleEditPost,
  } = useModalContext();

  return (
    <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
      <DialogTitle>Edit Post</DialogTitle>
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
        <Button variant={'outlined'} onClick={handleCloseEditModal}>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={handleEditPost}
          disabled={!modalTitle || !modalContent} // Disable button if fields are empty
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditModal;
