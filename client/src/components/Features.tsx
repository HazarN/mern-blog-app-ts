import { Box, Container, Typography } from '@mui/material';

const mainBoxStyles: React.CSSProperties = {
  padding: '4rem 0',
  backgroundColor: 'secondary.main',
  color: 'white',
  textAlign: 'center',
};

function Features(): JSX.Element {
  return (
    <>
      <Box sx={mainBoxStyles}>
        <Container>
          <Typography variant='h4' align='center' gutterBottom>
            Why Choose Our Blog?
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 6,
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='h6'>High-Quality Content</Typography>

              <Typography variant='body2' paragraph>
                We provide well-researched articles that will help you improve
                your development skills.
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='h6'>Beginner-Friendly</Typography>

              <Typography variant='body2' paragraph>
                Our content is accessible to developers of all levels, with
                clear explanations and examples.
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='h6'>Up-to-Date Trends</Typography>

              <Typography variant='body2' paragraph>
                Stay up-to-date with the latest developments in the MERN stack
                and frontend technologies.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box sx={mainBoxStyles}>
        <Container>
          <Typography variant='h4' gutterBottom>
            Ready to Learn?
          </Typography>

          <Typography variant='h6' paragraph>
            Join us today and start exploring the world of web development with
            our comprehensive blog articles!
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default Features;
