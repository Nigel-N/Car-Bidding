import Axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

// material-ui
import { Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { InputAdornment } from '@mui/material';

// ant-icons
import { EditOutlined } from '@ant-design/icons';

// react-image-gallery
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import "../../assets/images/css/CustomImageCarousel.css";

// components
import MainCard from 'components/MainCard';
import ProductFilterSidebar from './ProductFilterSidebar';
import AddDetailsDropdown from './AddDetailsDropdown';

const url = process.env.REACT_APP_API_URL;

// ========================================|| BIDDING PAGE FUNCTIONS ||======================================== //
const BiddingPage = () => {
    // Filter open close functions --------------------------------------------------
    const [openFilter, setOpenFilter] = useState(false);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };


    // Car bidding data functions --------------------------------------------------
    const [biddingCars, setBiddingCars] = useState([]);
    const [defaultBiddingCars, setDefaultBiddingCars] = useState([]);
    const [userData, setUserData] = useState({ UserID: " ", UserEmail: " ", UserPassword: " ", UserFirstName: " ", UserLastName: " ", CompanyName: " " });
 
    const biddingCarsData = () => {
        // Get user data from session
        const user = sessionStorage.getItem('userKey');
        const userObj = JSON.parse(user);
        setUserData(userObj);

        // Get current date in YYYY-MM-DD
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        // const currentDate = `${year}-${month}-${day}`;

        // Test date
        const currentDate = "2022-08-20";

        Axios.get(`${url}/biddingCars`, 
            { params: 
                { 
                    id: userObj.UserID, 
                    date: currentDate 
                }
             })
        .then((res) => {    
            const cars = res.data;  // Bidding car data
            const actualBidObj = {};
            const depreciationObj = {}; 
            const bidButtonObj = {};

            cars.map((car, index) => {
                const carImageArray = car.CarImageArray.split(",");  // List of images
                const images = [];  // Image array object

                carImageArray.map((image) => {
                    const imageLink = require("../../assets/images/cars/" + image).default;
                    const imageSetting = {
                        original: imageLink,
                        thumbnail: imageLink 
                    };
                    images.push(imageSetting);
                })

                // Insert as object attribute
                cars[index].CarImageObject = images;

                // Populate objects so that other functions can retrieve data with key bidcarid
                actualBidObj[car.BidCarID] = car.ActualBid;
                depreciationObj[car.BidCarID] = car.Depreciation;
                bidButtonObj[car.BidCarID] = car.BidStatus;

            })

            setBiddingCars(cars);
            setDefaultBiddingCars(cars);
            setActualBid(actualBidObj);
            setDepreciation(depreciationObj);
            setBidButton(bidButtonObj);

        })
        .catch((error) => {
            console.log(error);
        })

    }


    // Actual bid & Depreciation functions --------------------------------------------------
    const [actualBid, setActualBid] = useState({});
    const [depreciation, setDepreciation] = useState({});

    const handleActualBidChange = (e) => {
        const {name, value} = e.target;
        
        setActualBid((prev) => {
            return {...prev, [name]: value}
        })

        setDepreciation((prev) => {
            return {...prev, [name]: Math.round(value * 0.9)}
        })

    }

    const handleDepreciationChange = (e) => {
        const {name, value} = e.target;
 
        setDepreciation((prev) => {
            return {...prev, [name]: value}
        })

        setActualBid((prev) => {
            return {...prev, [name]: Math.round(value / 9 * 10)}
        })
    }


    // Submit bid & Edit bid functions --------------------------------------------------
    const [bidButton, setBidButton] = useState({});

    const submitBid = (e) => {
        const {name} = e.target;

        Axios.post(`${url}/biddingCars`,
        {
            userId: userData.UserID,
            bidCarId: name,
            actualBid: actualBid[name],
            depreciation: depreciation[name]
        }
        )
        .then(res => {
            res.status === 200 ? console.log("Bid submitted") : console.log("Submit failed")
            
            if (res.status === 200) {
                setBidButton((prev) => {
                    return {...prev, [name]: "edit"}
                })
                console.log(res.response);
            }
            else if (res.status === 401 || res.status === 501) {
                console.log("Invalid input");
            }
            else {
                console.log("A random error has occured");
            }

        })
        .catch((error) => {
            console.log(error);
        })

    }

    const handleEditBid = (e) => {
        const {name} = e.target;

        console.log("aloha");
        console.log(userData.UserID);
        console.log(name);

        // Delete bid when actual bid set to 0
        if (actualBid[name] == 0 || actualBid[name] == "") {
            Axios.delete(`${url}/biddingCars`,
            { data: {
                    userId: userData.UserID,
                    bidCarId: name
                }
            }
            )
            .then(res => {
                res.status === 200 ? console.log("Bid deleted") : console.log("Delete bid failed")
                
                if (res.status === 200) {
                    setBidButton((prev) => {
                        return {...prev, [name]: ""}
                    })
                    console.log(res.response);
                }
                else if (res.status === 401 || res.status === 501) {
                    console.log("Invalid input");
                }
                else {
                    console.log("A random error has occured");
                }

            })
            .catch((error) => {
                console.log(error);
            })

        }
        // Update bid
        else {
            Axios.put(`${url}/biddingCars`,
            {
                userId: userData.UserID,
                bidCarId: name,
                actualBid: actualBid[name],
                depreciation: depreciation[name]
            }
            )
            .then(res => {
                res.status === 200 ? console.log("Bid updated") : console.log("Update bid failed")
                
                if (res.status === 200) {
                    setBidButton((prev) => {
                        return {...prev, [name]: "edit"}
                    })
                    console.log(res);
                }
                else if (res.status === 401 || res.status === 501) {
                    console.log("Invalid input");
                }
                else {
                    console.log("A random error has occured");
                }

            })
            .catch(
                (error) => console.log(error)
            )

        }

    }


    // Sort by functions --------------------------------------------------
    const [sorts, setSorts] = useState({});

    const handleSortByPriceAsc =  (e) => {
        // Sort by PaperValue ASC if checked
        if (e.target.checked) {
            const sortedCars = [];

            
            defaultBiddingCars.map((car) => {
                let pointer = 0;

                if (sortedCars.length == 0) {
                    sortedCars.push(car);
                }
                else {
                    for (let i in sortedCars) {
                        if (sortedCars[i].PaperValue > car.PaperValue) {
                            pointer += 1; 
                        }
                        else {
                            break;
                        }
                    }

                    sortedCars.splice(pointer, 0 , car);

                }

            })

            setSorts((prev) => {
                return {...prev, ["sortByPrice"]: true}
            })

            setBiddingCars(sortedCars);
            
        }
        // Sort by default order if unchecked
        else {
            setSorts((prev) => {
                return {...prev, ["sortByPrice"]: false}
            })

            setBiddingCars(defaultBiddingCars);
            
        }
        
    }

    const handleSortByRegistrationDateAsc =  (e) => {
        // Sort by OrgRegistration ASC if checked
        if (e.target.checked) {
            const sortedCars = [];

            defaultBiddingCars.map((car) => {
                let pointer = 0;

                if (sortedCars.length == 0) {
                    sortedCars.push(car);
                }
                else {
                    for (let i in sortedCars) {
                        const sortedCarDateArray = sortedCars[i].OrgRegistration.split("/");
                        const carDateArray = car.OrgRegistration.split("/");

                        const sortedCarDate = new Date(Number(sortedCarDateArray[2]), Number(sortedCarDateArray[1]) - 1, Number(sortedCarDateArray[0]));
                        const CarDate = new Date(Number(carDateArray[2]), Number(carDateArray[1]) - 1, Number(carDateArray[0]));

                        if (sortedCarDate > CarDate) {
                            pointer += 1; 
                        }
                        else {
                            break;
                        }
                    }

                    sortedCars.splice(pointer, 0 , car);

                }
                
            })

            setSorts((prev) => {
                return {...prev, ["sortByOrgRegistration"]: true}
            })

            setBiddingCars(sortedCars);
            
        }
        // Sort by default order if unchecked
        else {
            setSorts((prev) => {
                return {...prev, ["sortByOrgRegistration"]: false}
            })

            setBiddingCars(defaultBiddingCars);
            
        }
        
    }

    const handleSortByManufacturingDateAsc =  (e) => {
        // Sort by ManuYear ASC
        if (e.target.checked) {
            const sortedCars = [];

            defaultBiddingCars.map((car) => {
                let pointer = 0;

                if (sortedCars.length == 0) {
                    sortedCars.push(car);
                }
                else {
                    for (let i in sortedCars) {
                        if (Number(sortedCars[i].ManuYear) > Number(car.ManuYear)) {
                            pointer += 1; 
                        }
                        else {
                            break;
                        }
                    }

                    sortedCars.splice(pointer, 0 , car);

                }

            })

            setSorts((prev) => {
                return {...prev, ["sortByManuYear"]: true}
            })

            setBiddingCars(sortedCars);
            
        }
        else {
            setSorts((prev) => {
                return {...prev, ["sortByManuYear"]: false}
            })

            setBiddingCars(defaultBiddingCars);
            
        }
        
    }

    
    // Runs once on first render
    useEffect(() => {
        biddingCarsData();
    }, []);


// ========================================|| BIDDING PAGE RENDER ||======================================== //
    return (
        <>
            {/* Filters / Sorts button -------------------------------------------------- */}
            <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 0 }}>
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                    <ProductFilterSidebar
                    sorts={sorts}
                    isOpenFilter={openFilter}
                    onOpenFilter={handleOpenFilter}
                    onCloseFilter={handleCloseFilter}
                    handleSortByPriceAsc={handleSortByPriceAsc}
                    handleSortByRegistrationDateAsc={handleSortByRegistrationDateAsc}
                    handleSortByManufacturingDateAsc={handleSortByManufacturingDateAsc}
                    />
                </Stack>
            </Stack>

            {/* Bidding car cards -------------------------------------------------- */}
            <Grid container spacing={2}>
                {biddingCars.map((car) => (
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <Box sx={{ boxShadow: 1, borderRadius: 2}}>
                            <MainCard border={true}>

                                {/* MAIN STACK START */}
                                <Stack>

                                    {/* STACK ITEM 1 - TITLE ROW */}
                                    <h3>{car.CarMake} {car.CarModel} | #{String(car.BidCarID).padStart(4, '0')}</h3>

                                    {/* STACK ITEM 2 - CONTENT ROW */}
                                    {/* CONTENT GRID START */}
                                    <Grid container rowSpacing={5} columnSpacing={1}>

                                        {/* GRID ITEM 1 - CAR IMAGE CAROUSEL */}
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                            <div style={{ width: "100%", height: "100%" }}>
                                                <ImageGallery 
                                                    items={car.CarImageObject}
                                                    showPlayButton={false} 
                                                    showNav={false}
                                                />
                                            </div>
                                        </Grid>
                                        
                                        {/* GRID ITEM 2 - CAR INFORMATION */}
                                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                            <Grid container direction="row" justifyContent="center" alignItems="center">
                                            
                                                {/* Left Column */}
                                                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                    <Stack spacing={2}>
                                                        <Stack spacing={0} justifyContent="center" alignItems="center">
                                                            <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Mileage</Typography>
                                                            <Typography variant="subtitle1">{car.Mileage.toLocaleString("en-US")} km</Typography>
                                                        </Stack>
                                                        <Stack spacing={0} justifyContent="center" alignItems="center">
                                                            <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Vehicle Code</Typography>
                                                            <Typography variant="subtitle1">{car.VehicleCode}</Typography>
                                                        </Stack>
                                                        <Stack spacing={0} justifyContent="center" alignItems="center">
                                                            <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Min.PARF</Typography>
                                                            <Typography variant="subtitle1">${car.MinPARF.toLocaleString("en-US")}</Typography>
                                                        </Stack>
                                                        <Stack spacing={0} justifyContent="center" alignItems="center">
                                                            <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Ownership</Typography>
                                                            <Typography variant="subtitle1">{car.Ownership}</Typography>
                                                        </Stack>
                                                        <Stack spacing={0} justifyContent="center" alignItems="center">
                                                            <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Color</Typography>
                                                            <Typography variant="subtitle1">{car.Color}</Typography>
                                                        </Stack>
                                                    </Stack>
                                                </Grid>

                                                {/* Right Column */}
                                                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                    <Stack spacing={2}>
                                                        <Stack spacing={0} justifyContent="center" alignItems="center">
                                                            <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Org. Registration</Typography>
                                                            <Typography variant="subtitle1">{car.OrgRegistration}</Typography>
                                                        </Stack>
                                                        <Stack spacing={0} justifyContent="center" alignItems="center">
                                                            <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap"  }}>Road Tax Expiry</Typography>
                                                            <Typography variant="subtitle1">{car.RoadTaxExpiry}</Typography>
                                                        </Stack>
                                                        <Stack spacing={0} justifyContent="center" alignItems="center">
                                                            <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>COE Expiry</Typography>
                                                            <Typography variant="subtitle1">{car.COEExpiry}</Typography>
                                                        </Stack>
                                                        <Stack spacing={0} justifyContent="center" alignItems="center">
                                                            <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Paper Value</Typography>
                                                            <Typography variant="subtitle1">${car.PaperValue.toLocaleString("en-US")}</Typography>
                                                        </Stack>
                                                        <Stack spacing={0} justifyContent="center" alignItems="center">
                                                            <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Manu.Year</Typography>
                                                            <Typography variant="subtitle1">{car.ManuYear}</Typography>
                                                        </Stack>
                                                    </Stack>
                                                </Grid>

                                            </Grid>

                                        </Grid>

                                    </Grid>
                                    {/* CONTENT GRID END */}

                                    {/* STACK ITEM 3 - ADDITIONAL DETAILS DROPDOWN */}
                                    <Box pb={3} pt={3}>
                                        <AddDetailsDropdown car={car}/>
                                    </Box>

                                    {/* STACK ITEM 4 - INPUTS & BUTTON ROW */}
                                    <Stack direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row' }} spacing={3} justifyContent="space-between">

                                        {/* Actual Bid input */}
                                        <TextField
                                            label="Actual Bid"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                            fullWidth
                                            name={car.BidCarID}
                                            value={actualBid[car.BidCarID]}
                                            onChange={handleActualBidChange}
                                            disabled={car.BidStatus == "Bid Won" ? true : false}
                                        />

                                        {/* Depreciation input */}
                                        <TextField
                                            label="Depreciation"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                            fullWidth
                                            
                                            name={car.BidCarID}
                                            value={depreciation[car.BidCarID]}
                                            onChange={handleDepreciationChange}
                                            disabled={car.BidStatus == "Bid Won" ? true : false}
                                        />

                                        {/* Bidding button */}
                                        {car.BidStatus == "pending" ? 

                                            <Button variant="contained" sx={{ whiteSpace: "nowrap"}} name={car.BidCarID} onClick={handleEditBid} color="warning"><EditOutlined /></Button> : 
                                            car.BidStatus == "Bid Won" ? 

                                                <Button variant="contained" sx={{ whiteSpace: "nowrap"}} name={car.BidCarID} onClick={submitBid} disabled>Bid Won</Button> :
                                                bidButton[car.BidCarID] == "edit" ? 

                                                    <Button variant="contained" sx={{ whiteSpace: "nowrap"}} name={car.BidCarID} onClick={handleEditBid} color="warning"><EditOutlined /></Button> : 
                                                    <Button variant="contained" sx={{ whiteSpace: "nowrap"}} name={car.BidCarID} onClick={submitBid}>Submit</Button>}

                                    </Stack>
                                    
                                </Stack>
                                {/* MAIN STACK END */}

                            </MainCard>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </>      
    );

};

export default BiddingPage;
