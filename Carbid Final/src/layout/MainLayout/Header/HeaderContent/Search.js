// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput, Typography } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
        <Typography variant="subtitle1" style={{ fontStyle: 'italic' }}>
            A New Car Dealing Experience
        </Typography>
    </Box>
);

export default Search;
