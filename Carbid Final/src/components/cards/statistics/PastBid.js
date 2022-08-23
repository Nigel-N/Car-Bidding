import PropTypes from 'prop-types';

// material-ui
import { Box, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// newly added
import { Avatar, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { Link, Card, CardContent } from '@mui/material';
import { fDate } from '../../../utils/formatTime';
import SvgIconStyle from './SvgIconStyle';
import Iconify from './Iconify';

import { FileSearchOutlined } from '@ant-design/icons';

const CardMediaStyle = styled('div')({
    position: 'relative',
    paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
    height: 44,
    overflow: 'hidden',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
    zIndex: 9,
    width: 36,
    height: 36,
    position: 'absolute',
    left: theme.spacing(3),
    bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
    color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const PastBid = ({ title, car, mybid, color, status, carlogo, date, index }) => {
    const latestPostLarge = index === 0;
    const latestPost = index === 1 || index === 2;

    return (
        <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
            <Card sx={{ position: 'relative', borderRadius: '25px 25px 10px 10px' }}>
                <CardMediaStyle
                    sx={{
                        ...((latestPostLarge || latestPost) && {
                            pt: 'calc(100% * 4 / 3)',
                            '&:after': {
                                top: 0,
                                content: "''",
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
                            }
                        }),
                        ...(latestPostLarge && {
                            pt: {
                                xs: 'calc(100% * 4 / 3)',
                                sm: 'calc(100% * 3 / 4.66)'
                            }
                        })
                    }}
                >
                    <SvgIconStyle
                        color="paper"
                        src="/static/icons/shape-avatar.svg"
                        sx={{
                            width: 80,
                            height: 36,
                            zIndex: 9,
                            bottom: -15,
                            position: 'absolute',
                            color: 'background.paper',
                            ...((latestPostLarge || latestPost) && { display: 'none' })
                        }}
                    />

                    <AvatarStyle
                        alt="car logo"
                        src={carlogo}
                        sx={{
                            ...((latestPostLarge || latestPost) && {
                                zIndex: 9,
                                top: 24,
                                left: 24,
                                width: 40,
                                height: 40
                            })
                        }}
                    />
                    <CoverImgStyle alt="car picture" src={car} />
                </CardMediaStyle>

                <CardContent
                    sx={{
                        pt: 4,
                        ...((latestPostLarge || latestPost) && {
                            bottom: 0,
                            width: '100%',
                            position: 'absolute'
                        })
                    }}
                >
                    <Typography gutterBottom variant="caption1" sx={{ color: '#929fac', display: 'block' }}>
                        SGD ${mybid}
                    </Typography>

                    <TitleStyle
                        to="#"
                        color="inherit"
                        variant="subtitle1"
                        underline="hover"
                        component={RouterLink}
                        sx={{
                            ...(latestPostLarge && { typography: 'h5', height: 60 }),
                            ...((latestPostLarge || latestPost) && {
                                color: 'common.white'
                            })
                        }}
                    >
                        {title}
                    </TitleStyle>

                    <InfoStyle>
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                ml: index === 0 ? 0 : 1.5,
                                ...((latestPostLarge || latestPost) && {
                                    color: 'grey.500'
                                })
                            }}
                        >
                            <Iconify icon="clarity:date-line" sx={{ width: 16, height: 16, mr: 0.5 }} />
                            <Typography variant="caption1" sx={{ color: '#919eab' }}>
                                {date}&nbsp;&nbsp;&nbsp;
                            </Typography>
                            <Iconify icon="fluent:document-search-24-regular" sx={{ width: 16, height: 16, mr: 0.5 }} />
                            <Typography variant="caption1" sx={{ color: { color } }}>
                                {status}
                            </Typography>
                        </Box>
                    </InfoStyle>
                </CardContent>
            </Card>
        </Grid>
    );
};

PastBid.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    percentage: PropTypes.number,
    isLoss: PropTypes.bool,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    post: PropTypes.object.isRequired,
    index: PropTypes.number
};

PastBid.defaultProps = {
    color: 'primary'
};

export default PastBid;
