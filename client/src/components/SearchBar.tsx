import { InputBase, Paper, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { usePostContext } from '../hooks/usePostContext';
import { useEffect, useRef } from 'react';

function SearchBar(): JSX.Element {
  const { searchQuery, dispatch } = usePostContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === 'Enter') {
        inputRef.current?.focus();
        dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

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
        inputRef={inputRef}
        value={searchQuery}
        onChange={(e) =>
          dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })
        }
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
