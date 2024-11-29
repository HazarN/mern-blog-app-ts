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
    editedTitle,
    editedContent,
    dispatch,
    handleCloseModal,
    handleEditPost,
  } = useModalContext();

  return (
    <Dialog open={isEditModalOpen} onClose={handleCloseModal}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          label='Title'
          fullWidth
          margin='normal'
          value={editedTitle}
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
          value={editedContent}
          onChange={(e) =>
            dispatch({ type: 'EDIT_CONTENT', payload: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button variant={'outlined'} onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={handleEditPost}
          disabled={!editedTitle || !editedContent} // Disable button if fields are empty
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditModal;
