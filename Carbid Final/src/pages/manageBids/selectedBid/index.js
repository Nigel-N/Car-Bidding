import { useState } from 'react';
import { useEffect } from 'react';

// components
import MainCard from 'components/MainCard';
import SelectedBidUsersTable from './SelectedBidUsersTable';

// ========================================|| SELECTED BIDS PAGE FUNCTIONS ||======================================== //
const SelectedBidsPage = () => {
	const [bidCar, setBidCar] = useState(JSON.parse(sessionStorage.getItem('selectedBid')));
    
    // Runs once on first render
    useEffect(() => {
        // Get selected bid from session --------------------------------------------------
        try {
            setBidCar(JSON.parse(sessionStorage.getItem('selectedBid')));
        }
        catch (error) {
            console.log("no car selected");
        }
    }, []);


// ========================================|| SELECTED BIDS PAGE RENDER ||======================================== //
    return(
        <>
            {/* TITLE */}
            <MainCard title={bidCar.carMake + ' ' + bidCar.carModel + ' | #' + String(bidCar.bidCarId).padStart(4, '0')}>
                {/* TABLE */}
                <SelectedBidUsersTable 
                bidCarId={bidCar.bidCarId}
                />
            </MainCard>
        </>
    );
};

export default SelectedBidsPage;
