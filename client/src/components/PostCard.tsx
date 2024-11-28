import { Box, Card, Grid, Typography } from '@mui/material';

import { usePostContext } from '../hooks/usePostContext';

const cardStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',

  margin: '1rem',
  padding: '1rem',

  borderTop: '15px solid',
  borderTopColor: 'primary.main',
  borderBottom: '5px solid',
  borderBottomColor: 'secondary.main',
  cursor: 'pointer',
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function PostCard({ id }: { id: number }): JSX.Element | null {
  const { getPostById } = usePostContext();

  const post = getPostById(id);

  if (!post) return null;

  post.createdAt = new Date(post.createdAt);
  post.lastUpdate = new Date(post.lastUpdate);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={cardStyles} key={post.id}>
        <Box>
          <Typography variant='h6'>{post.title}</Typography>
        </Box>

        <Typography
          fontSize={'0.8rem'}
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          Last updated: {dateFormatter.format(post.lastUpdate)}
        </Typography>
      </Card>
    </Grid>
  );
}

export default PostCard;
