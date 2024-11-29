import { Box, Button, Card, Container, Typography } from '@mui/material';

import { usePostContext } from '../hooks/usePostContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useModalContext } from '../hooks/useModalContext';

import EditModal from './EditModal';

import { cardStyles } from '../styles/card-styles';

const buttonContainer = {
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '1rem',
  gap: '1rem',
};

function CLickedPost(): JSX.Element {
  const { userCredentials } = useAuthContext();
  const { currentPost } = usePostContext(); // Assume updatePost is a function to update the post
  const { handleOpenModal } = useModalContext();

  const handleDeletePost = () => {
    // Logic for deleting the post
    console.log('Post deleted');
  };

  return (
    <Container>
      <Card
        sx={{
          ...cardStyles,
          height: '250px',
        }}
      >
        <Typography variant='h4'>{currentPost?.title}</Typography>
        <Typography>{currentPost?.content}</Typography>
        <Typography
          fontSize='1rem'
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          Author:{' '}
          {currentPost?.author?.id === userCredentials?.id
            ? 'You'
            : currentPost?.author?.name}
        </Typography>
      </Card>

      {/* Edit and Delete buttons if the auth-user is the author */}
      {currentPost?.author?.id === userCredentials?.id && (
        <Box sx={buttonContainer}>
          <Button variant='contained' onClick={handleOpenModal}>
            Edit
          </Button>
          <Button variant='contained' onClick={handleDeletePost}>
            Delete
          </Button>
        </Box>
      )}

      {/* Modal for editing the post */}
      <EditModal />
    </Container>
  );
}

export default CLickedPost;
