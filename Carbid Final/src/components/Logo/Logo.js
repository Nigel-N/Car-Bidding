// material-ui
import { useTheme } from '@mui/material/styles';

// newly added
import logo from 'assets/images/icons/logo.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Mantis" width="100" />
         *
         */
        <>
            <img src={logo} alt="Mantis" width="200" />
        </>
    );
};

export default Logo;
