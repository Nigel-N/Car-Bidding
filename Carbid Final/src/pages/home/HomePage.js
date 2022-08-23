// material-ui
import { Breadcrumbs, Divider, Grid, Link, Stack, Typography, Box, IconButton, Avatar, Button, Card } from '@mui/material';

// project import
import ComponentSkeleton from '../components-overview/ComponentSkeleton';
import MainCard from 'components/MainCard';

// newly added
import {
    FolderOpenOutlined,
    CarOutlined,
    BookOutlined,
    CheckCircleOutlined,
    LineChartOutlined,
    SolutionOutlined,
    HddOutlined
} from '@ant-design/icons';

import advertisement1 from '../../assets/images/mock/advertisements/advertisement1.jpg';
import CountdownTimer from './CountdownTimer';
import './home.css';
import BidSummary from 'components/Home/BidSummary';

import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'moment';

import { Link as RouterLink } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL;

function CarBox({ bgcolor, title, data, dark, main }) {
    return (
        <>
            <Card sx={{ '&.MuiPaper-root': { borderRadius: '0px' } }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: 1.35,
                        bgcolor,
                        color: dark ? 'grey.800' : '#ffffff',
                        border: main ? '1px dashed' : '1px solid transparent'
                    }}
                >
                    {title && (
                        <Grid container justifyContent="space-around" alignItems="center">
                            <Grid item>
                                {data && (
                                    <Stack spacing={0.75}>
                                        <Avatar
                                            variant={'rounded'}
                                            alt="The image"
                                            src={data.car}
                                            style={{
                                                width: '100%',
                                                height: '55px'
                                            }}
                                        />
                                    </Stack>
                                )}
                            </Grid>
                            <Grid item xs={7} sm={7} md={7} lg={7}>
                                {data && (
                                    <Stack spacing={0.75} alignItems="center">
                                        <Typography variant="subtitle">{data.title}</Typography>
                                        <Typography variant="subtitle2">{data.price}</Typography>
                                    </Stack>
                                )}
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Card>
        </>
    );
}

CarBox.propTypes = {
    bgcolor: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object.isRequired,
    dark: PropTypes.bool,
    main: PropTypes.bool
};

function MoreBox({ bgcolor, title, data, dark, main }) {
    return (
        <>
            <Card sx={{ '&.MuiPaper-root': { borderRadius: '0px' } }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: 1.35,
                        bgcolor,
                        color: dark ? 'grey.800' : '#ffffff',
                        border: main ? '1px dashed' : '1px solid transparent'
                    }}
                >
                    {
                        <Grid container justifyContent="space-around" alignItems="center">
                            <Grid item>
                                {data && (
                                    <Stack spacing={0.75} alignItems="center">
                                        <Typography variant="subtitle">{data.more}</Typography>
                                    </Stack>
                                )}
                            </Grid>
                        </Grid>
                    }
                </Box>
            </Card>
        </>
    );
}

MoreBox.propTypes = {
    bgcolor: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object.isRequired,
    dark: PropTypes.bool,
    main: PropTypes.bool
};

// ===============================|| COMPONENT - COLOR ||=============================== //

const HomePage = () => {
    const hours = new Date().getHours();

    const [fixedBidTime, setFixedBidTime] = useState([]);
    const getFixedBidTime = async () => {
        try {
            const data = await axios.get(`${url}/fixedBidTime`);
            setFixedBidTime(data.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getFixedBidTime();
    }, []);

    // const dt1 = new Date('October 13, 2014 10:00:00');
    // const dt2 = new Date('October 13, 2014 11:13:00');

    const [curBidCars, setCurBidCars] = useState([]);
    const getCurBidCars = async () => {
        try {
            const data = await axios.get(`${url}/curBidCars`);
            setCurBidCars(data.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getCurBidCars();
    }, []);

    const [todayBidsSubmitted, setTodayBidsSubmitted] = useState([]);
    const getTodayBidsSubmitted = async () => {
        try {
            const data = await axios.get(`${url}/todayBidsSubmitted`);
            setTodayBidsSubmitted(data.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getTodayBidsSubmitted();
    }, []);

    const [previewBids, setPreviewBids] = useState([]);
    const getPreviewBids = async () => {
        try {
            const data = await axios.get(`${url}/previewBids`);
            setPreviewBids(data.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getPreviewBids();
    }, []);

    const [bidSummary, setBidSummary] = useState([]);
    const getBidSummary = async () => {
        try {
            const data = await axios.get(`${url}/bidSummary`);
            setBidSummary(data.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getBidSummary();
    }, []);

    const renderCurrentBid = () => {
        if (hours < 10 || hours > 18) {
            return (
                <Stack>
                    <p>There is no current bid going on.</p>
                    {fixedBidTime
                        .filter((item) => {
                            return item;
                        })
                        .map((item) => {
                            return (
                                <>
                                    <p>
                                        <Grid style={{ display: 'flex' }}>
                                            <Typography>The bid start at&nbsp;</Typography>
                                            <Typography bgcolor="#f2f4f5" border={1} borderLeft={1} borderRight={1} borderColor="#e4e6e7">
                                                {item.StartTime}:00 A.M.
                                            </Typography>
                                            <Typography>&nbsp;each day.</Typography>
                                        </Grid>
                                    </p>
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </>
                            );
                        })}
                </Stack>
            );
        } else {
            return (
                <Stack>
                    {curBidCars
                        .filter((item) => {
                            return item;
                        })
                        .map((item) => {
                            return <p>Currently there are {item.curBidCars} cars in the bid.</p>;
                        })}
                    {fixedBidTime
                        .filter((item) => {
                            return item;
                        })
                        .map((item) => {
                            const formatDate = Moment().format('MMM DD, YYYY');

                            const endTime = new Date(formatDate + ' ' + item.EndTime + ':00:00');
                            const now = new Date();

                            const end = endTime.getTime() - now.getTime();

                            const NOW_IN_MS = new Date().getTime();
                            const timeLeft = NOW_IN_MS + end;
                            return (
                                <>
                                    <p>
                                        <Grid style={{ display: 'flex' }}>
                                            <Typography>Closes at&nbsp;</Typography>
                                            <Typography bgcolor="#f2f4f5" border={1} borderLeft={1} borderRight={1} borderColor="#e4e6e7">
                                                &nbsp;{item.EndTime}:00 P.M.&nbsp;
                                            </Typography>
                                            <Typography>&nbsp;today.</Typography>
                                        </Grid>
                                    </p>
                                    <p>
                                        Left with:
                                        <CountdownTimer targetDate={timeLeft} />
                                    </p>
                                </>
                            );
                        })}
                </Stack>
            );
        }
    };

    const renderBidsSubmitted = () => {
        if (hours < 10 || hours > 18) {
            return (
                <Stack>
                    <Box
                        bgcolor="#f5f5f5"
                        style={{
                            height: '100%',
                            fontWeight: 'bold'
                        }}
                        sx={{ p: 1 }}
                    >
                        <Grid style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography>There is no bids going on now.</Typography>
                        </Grid>
                    </Box>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </Stack>
            );
        } else {
            if (previewBids.length == 2) {
                return (
                    <Stack>
                        <Box
                            bgcolor="#f5f5f5"
                            style={{
                                height: '100%',
                                fontWeight: 'bold'
                            }}
                            sx={{ p: 1 }}
                        >
                            <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography>You have submitted&nbsp;&nbsp;</Typography>
                                {todayBidsSubmitted
                                    .filter((item) => {
                                        return item;
                                    })
                                    .map((item) => {
                                        return (
                                            <Typography color="red" style={{ fontSize: '20px' }}>
                                                {item.todayBids}&nbsp;
                                            </Typography>
                                        );
                                    })}
                                <Typography>&nbsp;bids in current bid.</Typography>
                            </Grid>
                        </Box>
                        <br></br>
                        <Stack>
                            {previewBids
                                .filter((item) => {
                                    return item;
                                })
                                .map((item) => {
                                    return (
                                        <>
                                            <CarBox
                                                bgcolor="primary.lighter"
                                                data={{
                                                    title: item.CarMake + ' ' + item.CarModel,
                                                    price: 'SGD $' + item.ActualBid,
                                                    car: '/assets/images/mock/cars/' + item.Image1
                                                }}
                                                title="success.lighter"
                                                dark
                                            />
                                        </>
                                    );
                                })}
                            <MoreBox bgcolor="primary.lighter" data={{ more: '...' }} dark />
                        </Stack>
                    </Stack>
                );
            } else if (previewBids.length == 1) {
                return (
                    <Stack>
                        <Box
                            bgcolor="#f5f5f5"
                            style={{
                                height: '100%',
                                fontWeight: 'bold'
                            }}
                            sx={{ p: 1 }}
                        >
                            <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography>You have submitted&nbsp;&nbsp;</Typography>
                                {todayBidsSubmitted
                                    .filter((item) => {
                                        return item;
                                    })
                                    .map((item) => {
                                        return (
                                            <Typography color="red" style={{ fontSize: '20px' }}>
                                                {item.todayBids}&nbsp;
                                            </Typography>
                                        );
                                    })}
                                <Typography>&nbsp;bids in current bid.</Typography>
                            </Grid>
                        </Box>
                        <br></br>
                        <Stack>
                            {previewBids
                                .filter((item) => {
                                    return item;
                                })
                                .map((item) => {
                                    return (
                                        <>
                                            <CarBox
                                                bgcolor="primary.lighter"
                                                data={{
                                                    title: item.CarMake + ' ' + item.CarModel,
                                                    price: 'SGD $' + item.ActualBid,
                                                    car: '/assets/images/mock/cars/' + item.Image1
                                                }}
                                                title="success.lighter"
                                                dark
                                            />
                                        </>
                                    );
                                })}
                            <MoreBox bgcolor="primary.lighter" data={{ more: '...' }} dark />
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                        </Stack>
                    </Stack>
                );
            } else if (previewBids.length == 0) {
                return (
                    <Stack>
                        <Box
                            bgcolor="#f5f5f5"
                            style={{
                                height: '100%',
                                fontWeight: 'bold'
                            }}
                            sx={{ p: 1 }}
                        >
                            <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography>You have submitted&nbsp;&nbsp;</Typography>
                                {todayBidsSubmitted
                                    .filter((item) => {
                                        return item;
                                    })
                                    .map((item) => {
                                        return (
                                            <Typography color="red" style={{ fontSize: '20px' }}>
                                                {item.todayBids}&nbsp;
                                            </Typography>
                                        );
                                    })}
                                <Typography>&nbsp;bids in current bid.</Typography>
                            </Grid>
                        </Box>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <p></p>
                        <p></p>
                    </Stack>
                );
            }
        }
    };

    return (
        <ComponentSkeleton>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <MainCard style={{ borderRadius: '25px 25px 10px 10px' }}>
                        <Grid item xs={12} sx={{ mb: -3 }} style={{ display: 'flex' }}>
                            <Typography variant="h3">Current&nbsp;Bid&nbsp;</Typography>
                            <Typography variant="h5" style={{ padding: '5px' }}>
                                <CarOutlined style={{ verticalAlign: 'sub', color: '#8c8c8c' }} />
                            </Typography>
                            <Grid container justifyContent="flex-end">
                                <Button size="small" color={'primary'} variant={'outlined'} component={RouterLink} to="../bidding">
                                    View more
                                </Button>
                            </Grid>
                        </Grid>
                        <br></br>
                        <br></br>
                        <Divider />
                        {renderCurrentBid()}
                        <br></br>
                        <br></br>
                    </MainCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <MainCard style={{ borderRadius: '25px 25px 10px 10px', flex: '5' }}>
                        <Grid item xs={12} sx={{ mb: -3 }} style={{ display: 'flex' }}>
                            <Typography variant="h3">Bids&nbsp;Submitted&nbsp;</Typography>
                            <Typography variant="h5" style={{ padding: '5px' }}>
                                <BookOutlined style={{ verticalAlign: 'sub', color: '#8c8c8c' }} />
                            </Typography>
                            <Grid container justifyContent="flex-end">
                                <Button size="small" color={'primary'} variant={'outlined'} component={RouterLink} to="../bidding">
                                    View more
                                </Button>
                            </Grid>
                        </Grid>
                        <br></br>
                        <br></br>
                        <Divider />
                        <br></br>
                        {renderBidsSubmitted()}
                    </MainCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <MainCard style={{ borderRadius: '25px 25px 10px 10px' }}>
                        <Grid item xs={12} sx={{ mb: -3 }} style={{ display: 'flex' }}>
                            <Typography variant="h3">My&nbsp;Bid&nbsp;Summary&nbsp;</Typography>
                            <Typography variant="h5" style={{ padding: '5px' }}>
                                <FolderOpenOutlined style={{ verticalAlign: 'sub', color: '#8c8c8c' }} />
                            </Typography>
                            <Grid container justifyContent="flex-end">
                                <Button size="small" color={'primary'} variant={'outlined'} component={RouterLink} to="../mybids">
                                    View more
                                </Button>
                            </Grid>
                        </Grid>
                        <br></br>
                        <br></br>
                        <Divider />
                        <br></br>
                        <Stack>
                            {bidSummary
                                .filter((item) => {
                                    return item;
                                })
                                .map((item) => {
                                    return (
                                        <BidSummary
                                            list={[
                                                {
                                                    name: 'Participated batches',
                                                    value: item.ParticipatedBatches,
                                                    icon: <HddOutlined className="bidSummaryIcon" />
                                                },
                                                {
                                                    name: 'Submitted bids',
                                                    value: item.SubmittedBids,
                                                    icon: <SolutionOutlined className="bidSummaryIcon" />
                                                },
                                                {
                                                    name: 'Successful bids',
                                                    value: item.SuccessfulBids,
                                                    icon: <CheckCircleOutlined className="bidSummaryIcon" />
                                                },
                                                {
                                                    name: 'Average bids / batch',
                                                    value: item.AvgBidsPerBatch,
                                                    icon: <LineChartOutlined className="bidSummaryIcon" />
                                                }
                                            ]}
                                        />
                                    );
                                })}
                        </Stack>
                    </MainCard>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <IconButton
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <Avatar
                            variant={'rounded'}
                            alt="The image"
                            src={advertisement1}
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    </IconButton>
                </Grid>
            </Grid>
        </ComponentSkeleton>
    );
};

export default HomePage;
