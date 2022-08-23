// material-ui
import { useMediaQuery, Container, Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Container maxWidth="xl">
            <Stack
                direction={matchDownSM ? 'column' : 'row'}
                justifyContent={matchDownSM ? 'center' : 'space-between'}
                spacing={2}
                textAlign={matchDownSM ? 'center' : 'inherit'}
            >
                <Typography variant="subtitle2" component="span">
                    &copy; &nbsp;
                    <Typography component={Link} variant="subtitle2" href="" target="_blank" underline="hover">
                        SG Car Deals
                    </Typography>
                    &nbsp;All Rights Reserved
                </Typography>

                <Stack
                    direction={matchDownSM ? 'column' : 'row'}
                    spacing={matchDownSM ? 1 : 3}
                    textAlign={matchDownSM ? 'center' : 'inherit'}
                >
                    <Typography variant="subtitle2" component={Link} href="" target="_blank" underline="hover">
                        Privacy Policy
                    </Typography>
                    <Typography variant="subtitle2" component={Link} href="" target="_blank" underline="hover">
                        Terms & Conditions
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    );
};

export default AuthFooter;
