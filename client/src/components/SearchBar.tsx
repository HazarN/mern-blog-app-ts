import { InputBase, Paper, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar(): JSX.Element {
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 300,
        p: '2px 4px',
        borderRadius: 20,
        boxShadow: 3,
        backgroundColor: 'white',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search posts...'
        inputProps={{ 'aria-label': 'search posts' }}
      />
      <Box
        sx={{
          display: 'flex',
          padding: '0 10px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SearchIcon />
      </Box>
    </Paper>
  );
}

export default SearchBar;
