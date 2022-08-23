import Axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

// material-ui
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';

// project import
import BidCard from './BidCard';
import DatePicker from 'react-date-picker';

const url = process.env.REACT_APP_API_URL;

// ========================================|| MANAGE ALL BIDS PAGE FUNCTIONS ||======================================== //
const ManageBidsPage = () => {
    // Manage bids data functions --------------------------------------------------
    const [bids, setBids] = useState([]);

    const manageBidsData = () => {
        // Get current date in YYYY-MM-DD
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        // const currentDate = `${year}-${month}-${day}`;

        // Test date
        const currentDate = "2022-08-20";

        Axios.get(`${url}/manageBids/${currentDate}`)
        .then((res) => {    
            const bids = res.data; // Bid Data
            setBids(bids);
        })
        .catch((error) => {
            console.log(error);
        })

    }


    // Runs once on first render
    useEffect(() => {
        manageBidsData();
    }, []);

// ========================================|| MANAGE ALL BIDS PAGE RENDER ||======================================== //
    return(
        <>
            <Typography variant="h5">Manage Bids</Typography>

            <br></br>

            {/* <DatePicker
                dateFormat="yyyy-MM-dd"
                value={roadTaxExpiry}
                onChange={(onFilterSelectedDate) => {
                    const d = new Date(onFilterSelectedDate);
                    console.log(moment(new Date(d)).format('YYYY-MM-DD'));
                    setRoadTaxExpiry(d);
                    setCOEExpiry(moment(new Date(d)).format('YYYY-MM-DD'))
                }}
            /> */}

            {/* Manage bid cards -------------------------------------------------- */}
            <Grid container spacing={3}>
                {bids.map((bid) => (
                    <BidCard
                        bidCarId={bid.BidCarID}
                        image={"assets/images/cars/" + bid.Image1}
                        carMake={bid.CarMake}
                        carModel={bid.CarModel}
                        numOfBids={bid.NumOfBids}
                        highestBid={bid.HighestBid}
                        bidStatus={bid.BidStatus}
                    />
                ))}

            </Grid>
        </>
    );

};

export default ManageBidsPage;
