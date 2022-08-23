// material-ui
import { Typography } from '@mui/material';

// material-ui
import {
    Avatar,
    IconButton,
    AvatarGroup,
    Box,
    Button,
    ButtonGroup,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    TablePagination
} from '@mui/material';

import { useState, useEffect } from 'react';
import * as React from 'react';
import PastBid from 'components/cards/statistics/PastBid';
import PastBidsFilter from './PastBidsFilter';
import axios from 'axios';
import moment from 'moment';

const url = process.env.REACT_APP_API_URL;

// ==============================|| HOME PAGE ||============================== //
function findDayDifference(date1, date2) {
    return Math.floor(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
}

const MyBids = () => {
    const [openFilter, setOpenFilter] = useState(false);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const [myBids, setMyBids] = useState([]);

    const getFavouriteData = async () => {
        try {
            const data = await axios.get(`${url}/myBids`);
            setMyBids(data.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getFavouriteData();
    }, []);

    const [rowsPerPage, setRowsPerPage] = useState(4);

    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [status, setStatus] = useState('All');
    const [bidDate, setBidDate] = useState('All');
    const [selectedDate, setSelectedDate] = useState('');

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={24} md={12} lg={12}>
                <Typography variant="h5">My Bids</Typography>
                <br></br>
                <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
                    <Grid item xs={12}>
                        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 1 }}>
                            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                                <PastBidsFilter
                                    isOpenFilter={openFilter}
                                    onOpenFilter={handleOpenFilter}
                                    onCloseFilter={handleCloseFilter}
                                    onFilterStatus={(e) => {
                                        setStatus(e.target.value);
                                    }}
                                    onFilterStatusCheck={status}
                                    onFilterBidDate={(e) => {
                                        setBidDate(e.target.value);
                                    }}
                                    onFilterBidDateCheck={bidDate}
                                    onFilterSelectedDate={(event) => {
                                        setSelectedDate(moment(new Date(event.target.value)).format('YYYY-MM-DD'));
                                    }}
                                />
                            </Stack>
                        </Stack>
                        <Grid container spacing={3}>
                            {myBids
                                .filter((item) => {
                                    if (status == 'All' && bidDate == 'All') {
                                        return item;
                                    } else if (
                                        bidDate == 'Last 7 days' &&
                                        findDayDifference(new Date(), new Date(item.BidDate)) < 7 &&
                                        item.BidStatus == status
                                    ) {
                                        return item;
                                    } else if (
                                        bidDate == 'Last 14 days' &&
                                        findDayDifference(new Date(), new Date(item.BidDate)) < 14 &&
                                        item.BidStatus == status
                                    ) {
                                        return item;
                                    } else if (
                                        bidDate == 'Last 30 days' &&
                                        findDayDifference(new Date(), new Date(item.BidDate)) < 30 &&
                                        item.BidStatus == status
                                    ) {
                                        return item;
                                    } else if (
                                        bidDate == 'Last 7 days' &&
                                        findDayDifference(new Date(), new Date(item.BidDate)) < 7 &&
                                        status == 'All'
                                    ) {
                                        return item;
                                    } else if (
                                        bidDate == 'Last 14 days' &&
                                        findDayDifference(new Date(), new Date(item.BidDate)) < 14 &&
                                        status == 'All'
                                    ) {
                                        return item;
                                    } else if (
                                        bidDate == 'Last 30 days' &&
                                        findDayDifference(new Date(), new Date(item.BidDate)) < 30 &&
                                        status == 'All'
                                    ) {
                                        return item;
                                    } else if (bidDate == 'All' && item.BidStatus == status) {
                                        return item;
                                    } else if (bidDate == 'All' && item.BidStatus == status && item.BidDate == selectedDate) {
                                        return item;
                                    }
                                })
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item) => {
                                    if (item.BidStatus == 'Bid Won') {
                                        return (
                                            <PastBid
                                                title={item.CarMake + ' ' + item.CarModel}
                                                date={item.BidDate}
                                                car={'/assets/images/mock/cars/' + item.Image1}
                                                carlogo={'/assets/images/mock/cars/' + item.CarLogo}
                                                status={item.BidStatus}
                                                mybid={item.ActualBid}
                                                color={'#52c41a'}
                                            />
                                        );
                                    } else if (item.BidStatus == 'Bid Lost') {
                                        return (
                                            <PastBid
                                                title={item.CarMake + ' ' + item.CarModel}
                                                date={item.BidDate}
                                                car={'/assets/images/mock/cars/' + item.Image1}
                                                carlogo={'/assets/images/mock/cars/' + item.CarLogo}
                                                status={item.BidStatus}
                                                mybid={item.ActualBid}
                                                color={'#f5222d'}
                                            />
                                        );
                                    } else if (item.BidStatus == 'Pending') {
                                        return (
                                            <PastBid
                                                title={item.CarMake + ' ' + item.CarModel}
                                                date={item.BidDate}
                                                car={'/assets/images/mock/cars/' + item.Image1}
                                                carlogo={'/assets/images/mock/cars/' + item.CarLogo}
                                                status={item.BidStatus}
                                                mybid={item.ActualBid}
                                                color={'#faad14'}
                                            />
                                        );
                                    }
                                })}
                        </Grid>
                        <br></br>
                        <TablePagination
                            rowsPerPageOptions={[4, 8, 12]}
                            component="Grid"
                            count={myBids.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default MyBids;
