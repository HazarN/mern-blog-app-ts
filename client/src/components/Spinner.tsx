import { Box, CircularProgress } from '@mui/material';

const spinnerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function Spinner(): JSX.Element {
  return (
    <Box sx={spinnerStyle}>
      <CircularProgress />
    </Box>
  );
}

export default Spinner;
