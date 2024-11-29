import { Box, Card, Grid, Typography } from '@mui/material';

import { usePostContext } from '../hooks/usePostContext';

import { cardStyles } from '../styles/card-styles';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function PostCard({
  id,
  onClickPost,
}: {
  id: number;
  onClickPost: (id: number) => void;
}): JSX.Element | null {
  const { getPostById } = usePostContext();

  const post = getPostById(id);

  if (!post) return null;

  post.createdAt = new Date(post.createdAt);
  post.lastUpdate = new Date(post.lastUpdate);

  const handleClick = () => {
    onClickPost(post.id);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={cardStyles} key={post.id} onClick={handleClick}>
        <Typography variant='h5'>{post.title}</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Typography fontSize={'0.75rem'}>
            Updated: {dateFormatter.format(post.lastUpdate)}
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
}

export default PostCard;
