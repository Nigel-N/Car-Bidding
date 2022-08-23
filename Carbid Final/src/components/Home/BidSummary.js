// @mui
import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader, CardContent } from '@mui/material';

// ----------------------------------------------------------------------

BidSummary.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    list: PropTypes.array.isRequired
};

export default function BidSummary({ title, subheader, list, ...other }) {
    return (
        <Box
            sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(2, 1fr)'
            }}
        >
            {list.map((site) => (
                <Paper key={site.name} variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                    <Box sx={{ mb: 0.5 }}>{site.icon}</Box>

                    <Typography variant="h4">{site.value}</Typography>

                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {site.name}
                    </Typography>
                </Paper>
            ))}
        </Box>
    );
}
