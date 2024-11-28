import { Box, CircularProgress } from '@mui/material';

const spinnerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function Spinner({ size }: { size?: string }): JSX.Element {
  return (
    <Box sx={spinnerStyle}>
      <CircularProgress size={size} />
    </Box>
  );
}

export default Spinner;
