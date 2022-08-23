import { useNavigate } from 'react-router-dom';

// material-ui
import { 
    Box,
    Grid,
    Typography,
    Avatar,
    Link,
    Card,
    CardContent
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

// components
import SvgIconStyle from './SvgIconStyle';
import Iconify from './Iconify';

// ========================================|| MANAGE ALL BIDS PAGE (BidCard) STYLING ||======================================== //
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


// ========================================|| MANAGE ALL BIDS PAGE (BidCard) FUNCTIONS ||======================================== //
const BidCard = ({ bidCarId, image, carMake, carModel, numOfBids, highestBid, bidStatus, index }) => {
    const latestPostLarge = index === 0;
    const latestPost = index === 1 || index === 2;

    // Navigate to selected bid functions --------------------------------------------------
    const navigate = useNavigate()

    const navigateSelectedBid = () => {
        sessionStorage.setItem('selectedBid', JSON.stringify({bidCarId: bidCarId, carMake: carMake, carModel: carModel}));
        console.log(sessionStorage.getItem('selectedBid'));
        
        navigate('/selectBids');
    }


// ========================================|| MANAGE ALL BIDS PAGE (BidCard) RENDER ||======================================== //
    return (
        <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
            <Card sx={{ position: 'relative', borderRadius: '25px 25px 10px 10px' }}>
                {/* Card styling -------------------------------------------------- */}
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

                    <CoverImgStyle alt="bid picture" src={image} />
                </CardMediaStyle>

                {/* Card content -------------------------------------------------- */}
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
                    
                    {/* TITLE */}
                    <TitleStyle
                        to="#"
                        color="inherit"
                        variant="subtitle1"
                        underline="hover"
                        onClick={navigateSelectedBid}
                        sx={{
                            ...(latestPostLarge && { typography: 'h5', height: 60 }),
                            ...((latestPostLarge || latestPost) && {
                                color: 'common.white'
                            })
                        }}
                    >
                        {carMake + ' ' + carModel + ' | #' + String(bidCarId).padStart(4, '0')}
                    </TitleStyle>

                    {/* HIGHEST BID */}
                    <Typography gutterBottom variant="caption1" sx={{ color: '#929fac', display: 'inline-block',}}>
                        Highest Bid :  
                        <Typography sx={{ color: '#373e4a', display: 'inline-block', pl: 1 }}>
                            SGD $ {!highestBid ? 0 : highestBid}
                        </Typography>
                    </Typography>
                    
                    {/* BID AWARDED */}
                    <Typography gutterBottom variant="caption1" sx={{ color: '#66ff66', display: "block"}}>
                        {bidStatus == "Bid Won" ?
                        "Bid Awarded":
                        ""}
                    </Typography>
                    
                    {/* Number of bidders */}
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
                            <Iconify icon="ant-design:user-outlined" sx={{ width: 30, height: 30, mr: 0.5}} />
                            <Typography variant="h3" sx={{ color:  "#373e4a" }}>
                                {!numOfBids ? 0 : numOfBids}
                            </Typography>
                        </Box>
                    </InfoStyle>

                </CardContent>

            </Card>
        </Grid>
    );
    
};

export default BidCard;
