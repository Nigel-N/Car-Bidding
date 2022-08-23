import PropTypes from 'prop-types';

// material-ui
import { Box, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// newly added
import { Avatar, Button } from '@mui/material';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const OngoingBid = ({ title, car }) => (
    <Button contentSX={{ p: 2.25 }}>
        <Stack spacing={0.5} xs={12}>
            <Typography variant="h5" color="textSecondary" style={{ height: '50px' }}>
                {title}
            </Typography>
            <Grid container alignItems="center">
                <Grid item>
                    <Avatar
                        variant={'rounded'}
                        alt="The image"
                        src={car}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </Grid>
            </Grid>
        </Stack>
    </Button>
);

OngoingBid.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    percentage: PropTypes.number,
    isLoss: PropTypes.bool,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

OngoingBid.defaultProps = {
    color: 'primary'
};

export default OngoingBid;
