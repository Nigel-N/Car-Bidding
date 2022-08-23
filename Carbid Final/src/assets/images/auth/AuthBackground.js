// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import logo from './loginBackground.png';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
    const theme = useTheme();
    return (
        <Box sx={{ position: 'absolute', filter: 'blur(10px)', zIndex: -1, bottom: 66 }}>
            <img src={logo} alt="Mantis" width="80%" height="100%" />
        </Box>
    );
};

export default AuthBackground;
