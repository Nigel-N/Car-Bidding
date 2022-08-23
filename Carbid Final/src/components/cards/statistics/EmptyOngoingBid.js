import PropTypes from 'prop-types';

// material-ui
import { Box, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// newly added
import { Avatar, Button } from '@mui/material';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const EmptyOngoingBid = ({ title, car, mybid, highestbid }) => (
    <MainCard contentSX={{ p: 2.25 }}>
        <Stack spacing={0.5} xs={12}>
            You did not bid for any car.
        </Stack>
    </MainCard>
);

EmptyOngoingBid.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    percentage: PropTypes.number,
    isLoss: PropTypes.bool,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

EmptyOngoingBid.defaultProps = {
    color: 'primary'
};

export default EmptyOngoingBid;
