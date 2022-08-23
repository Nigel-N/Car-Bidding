import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';

// newly added
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Button, Avatar } from '@mui/material';
import singpassImage from '../../assets/images/singpass/singpass.png';

// ================================|| LOGIN ||================================ //

const Login = () => {
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <AuthWrapper>
            <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
                <TabContext value={value}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Login with Singpass" value="1" style={{ minWidth: '50%' }} />
                        <Tab label="Login with account" value="2" style={{ minWidth: '50%' }} />
                    </TabList>
                    <TabPanel value="1">
                        <Grid item xs={12}>
                            <br></br>
                            <br></br>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Typography variant="h4">Scan with Singpass app</Typography>
                                <Typography variant="h5">to log in</Typography>
                                <Avatar
                                    variant={'rounded'}
                                    alt="The image"
                                    src={singpassImage}
                                    style={{
                                        width: '66%',
                                        height: '66%'
                                    }}
                                />
                            </Grid>
                            <br></br>
                            <br></br>
                        </Grid>
                    </TabPanel>

                    {/* ==============================|| LOGIN WITH EMAIL ||============================== */}
                    <TabPanel value="2">
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                                <Typography variant="h3">Login</Typography>
                                <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                                    Don&apos;t have an account?
                                </Typography>
                            </Stack>
                        </Grid>
                        <br></br>
                        <Grid item xs={12}>
                            <AuthLogin />
                        </Grid>
                    </TabPanel>
                </TabContext>
            </Box>
            <br></br>
        </AuthWrapper>
    );
};

export default Login;
