import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Container, Typography } from '@mui/material';

import { usePostContext } from '../hooks/usePostContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useModalContext } from '../hooks/useModalContext';

import EditModal from './EditModal';

import { cardStyles } from '../styles/card-styles';
import React from 'react';

const buttonContainer: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '1rem',
  gap: '1rem',
};

function CLickedPost(): JSX.Element {
  const navigate = useNavigate();
  const { userCredentials } = useAuthContext();
  const { currentPost, deletePost } = usePostContext(); // Assume updatePost is a function to update the post
  const { handleOpenEditModal } = useModalContext();

  function handleDeletePost() {
    if (currentPost) {
      deletePost(currentPost.id);
      navigate(-1);
    }
  }

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
          <Button variant='contained' onClick={handleOpenEditModal}>
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
