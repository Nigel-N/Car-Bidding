import { useState } from 'react';

// react-slick
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../assets/images/css/CarImageCarousel.css';

// material-ui
import { Typography } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Select } from '@mui/material';
import { Stack } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { Paper } from '@mui/material';
import Axios from 'axios';

// project import
import MainCard from 'components/MainCard';
import DatePicker from 'react-date-picker';
import moment from 'moment';

import {
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Card,
    Avatar,
    TablePagination
} from '@mui/material';

import Iconify from '../../components/Iconify';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;


// ==============================|| HOME PAGE ||============================== //

const AddBidCars = () => {
    const [bidDate, setBidDate] = useState();
    const [regDate, setRegDate] = useState();
    const [roadTaxExpiry, setRoadTaxExpiry] = useState();
    const [firstReg, setFirstReg] = useState();
    const [inspDue, setInspDue] = useState();
    const [parfExp, setParfExp] = useState();
    const location = useLocation();


    const [orgRegistration, setOrgRegistration] = useState();
    const [ownership, setOwnership] = useState();
    const [mileage, setMileage] = useState();
    const [minPARF, setMinPARF] = useState();
    const [paperValue, setPaperValue] = useState();
    const [cOEExpiry, setCOEExpiry] = useState();
    const [formRoadTaxExpiry, setFormRoadTaxExpiry] = useState();
    const [vehicleCode, setVehicleCode] = useState();
    const [manuYear, setManuYear] = useState();
    const [color, setColor] = useState();
    const [firstRegistration, setFirstRegistration] = useState();
    const [pARFExpiryDate, setPARFExpiryDate] = useState();
    const [accidentFree, setAccidentFree] = useState();
    const [purchaseFrom, setPurchaseFrom] = useState();
    const [vehScheme, setVehScheme] = useState();
    const [cOECategory, setCOECategory] = useState();
    const [cOEPeriod, setCOEPeriod] = useState();
    const [COE, setCOE] = useState();
    const [OMV, setOMV] = useState();
    const [ARF, setARF] = useState();
    const [inspectionDue, setInspectionDue] = useState();
    const [transmission, setTransmission] = useState();
    const [engineNo, setEngineNo] = useState();
    const [chassisNo, setChassisNo] = useState();
    const [fuelType, setFuelType] = useState();
    const [engineCapacity, setEngineCapacity] = useState();
    const [power, setPower] = useState();
    const [vehicleAttachment, setVehicleAttachment] = useState();
    const [maxLadenWeight, setMaxLadenWeight] = useState();
    const [unladenWeight, setUnladenWeight] = useState();
    const [formBidDate, setFormBidDate] = useState();

    let navigate = useNavigate(); 

    const submitAddBidCar = () => {
        Axios.post('`${url}/adminInsertBidCars`', 
        // Axios.post('http://localhost:5000/adminInsertBidCars', 
        {carID: location.state.carid, orgRegistration: orgRegistration, ownership: ownership, mileage: mileage, minPARF: minPARF, paperValue: paperValue, 
        cOEExpiry: cOEExpiry, roadTaxExpiry: formRoadTaxExpiry, vehicleCode: vehicleCode, manuYear: manuYear, color: color, 
        firstRegistration: firstRegistration, pARFExpiryDate: pARFExpiryDate, accidentFree: accidentFree, purchaseFrom: purchaseFrom, 
        vehScheme: vehScheme, cOECategory: cOECategory, cOEPeriod: cOEPeriod, COE: COE, OMV: OMV, ARF: ARF, 
        inspectionDue: inspectionDue, transmission: transmission, engineNo: engineNo, chassisNo: chassisNo, fuelType: fuelType, 
        engineCapacity: engineCapacity, power: power, vehicleAttachment: vehicleAttachment, maxLadenWeight: maxLadenWeight, 
        unladenWeight: unladenWeight, image1: null, image2: null, image3: null, image4: null, image5: null, image6: null, 
        bidDate: formBidDate
        })
        alert('The car is successfully added')
        let path = `/biddingcarsinfo`; 
        navigate(path)
        window.location.reload(false);
    };


    
    return (
        <>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 4 */}
            <Grid item xs={12} sx={{ mb: -2.25 }} style={{ display: 'flex' }}>
                <Typography variant="h5">&nbsp;Add&nbsp;Car&nbsp;Form</Typography>
            </Grid>
            <br></br>
            <Grid item xs={48} sm={24} md={16} lg={12}>
            <MainCard>
                <Grid container spacing={3}>
                    <Grid item xs={36} sm={18} md={12}>
                        <Stack alignItems="center" sx={{ mb: 0 }}>
                                <Stack>
                                    <br></br>
                                    {/* CONTENT ROW */}
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={5}>

                                        <Stack>
                                            <Table rowSpacing={8}>
                                                <TableBody item xs={2.4} sm={2.4} md={2.4} lg={2.4}>
                                                    <TableRow spacing={1} justifyContent="center" alignItems="center">
                                                        <TableCell style={{ textAlign: 'center' }}>
                                                            <Typography variant="h6">Image Upload</Typography>
                                                            <Iconify icon="mdi:camera" style={{ width: '80%', height: '80%', objectFit: 'cover', padding: '1px' }}></Iconify>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button component={RouterLink} to="../allcars">Change Car Make & Car Model</Button>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">CarMake</Typography>
                                                            <Typography variant="h6">{location.state.make}</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Car Model</Typography>
                                                            <Typography variant="h6">{location.state.model}</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Bid Date</Typography>
                                                            <DatePicker
                                                                dateFormat="yyyy-MM-dd"
                                                                value={bidDate}
                                                                onChange={(onFilterSelectedDate) => {
                                                                    const d = new Date(onFilterSelectedDate);
                                                                    console.log(moment(new Date(d)).format('YYYY-MM-DD'));
                                                                    setBidDate(d);
                                                                    setFormBidDate(moment(new Date(d)).format('YYYY-MM-DD'))
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                    <TableRow>&nbsp;</TableRow>
                                                    <TableRow>
                                                        <Typography variant="subtitle1">
                                                            Main Details
                                                        </Typography>
                                                    </TableRow>
                                                    <TableRow spacing={1} justifyContent="center" alignItems="center">
                                                        <TableCell>
                                                            <Typography variant="h6">Org. Registration</Typography>
                                                            <DatePicker
                                                                dateFormat="yyyy-MM-dd"
                                                                value={regDate}
                                                                onChange={(onFilterSelectedDate) => {
                                                                    const d = new Date(onFilterSelectedDate);
                                                                    console.log(moment(new Date(d)).format('YYYY-MM-DD'));
                                                                    setRegDate(d);
                                                                    setOrgRegistration(moment(new Date(d)).format('YYYY-MM-DD'))
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Ownership</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setOwnership(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Mileage</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setMileage(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Min.PARF</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setMinPARF(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Paper Value</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setPaperValue(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Typography variant="h6">COE Expiry</Typography>
                                                            <DatePicker
                                                                dateFormat="yyyy-MM-dd"
                                                                value={roadTaxExpiry}
                                                                onChange={(onFilterSelectedDate) => {
                                                                    const d = new Date(onFilterSelectedDate);
                                                                    console.log(moment(new Date(d)).format('YYYY-MM-DD'));
                                                                    setRoadTaxExpiry(d);
                                                                    setCOEExpiry(moment(new Date(d)).format('YYYY-MM-DD'))
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Road Tax Expiry</Typography>
                                                            <DatePicker
                                                                dateFormat="yyyy-MM-dd"
                                                                value={roadTaxExpiry}
                                                                onChange={(onFilterSelectedDate) => {
                                                                    const d = new Date(onFilterSelectedDate);
                                                                    console.log(moment(new Date(d)).format('YYYY-MM-DD'));
                                                                    setRoadTaxExpiry(d);
                                                                    setFormRoadTaxExpiry(moment(new Date(d)).format('YYYY-MM-DD'))
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Vehicle Code</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setVehicleCode(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Manu.Year</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setManuYear(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Colour</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setColor(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>&nbsp;</TableRow>
                                                    <TableRow>
                                                        <Typography variant="subtitle1">
                                                        Additional&nbsp;Details
                                                        </Typography>
                                                    </TableRow>
                                                    <TableRow spacing={1} justifyContent="center" alignItems="center">
                                                        <TableCell>
                                                            <Typography variant="h6">First Registration</Typography>
                                                            <DatePicker
                                                                dateFormat="yyyy-MM-dd"
                                                                value={firstReg}
                                                                onChange={(onFilterSelectedDate) => {
                                                                    const d = new Date(onFilterSelectedDate);
                                                                    console.log(moment(new Date(d)).format('YYYY-MM-DD'));
                                                                    setFirstReg(d);
                                                                    setFirstRegistration(moment(new Date(d)).format('YYYY-MM-DD'))
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Inspection Due</Typography>
                                                            <DatePicker
                                                                dateFormat="yyyy-MM-dd"
                                                                value={inspDue}
                                                                onChange={(onFilterSelectedDate) => {
                                                                    const d = new Date(onFilterSelectedDate);
                                                                    console.log(moment(new Date(d)).format('YYYY-MM-DD'));
                                                                    setInspDue(d);
                                                                    setInspectionDue(moment(new Date(d)).format('YYYY-MM-DD'))
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">COE Category</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setCOECategory(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Engine Capacity</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setEngineCapacity(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">PARF Expiry Date</Typography>
                                                            <DatePicker
                                                                dateFormat="yyyy-MM-dd"
                                                                value={parfExp}
                                                                onChange={(onFilterSelectedDate) => {
                                                                    const d = new Date(onFilterSelectedDate);
                                                                    console.log(moment(new Date(d)).format('YYYY-MM-DD'));
                                                                    setParfExp(d);
                                                                    setPARFExpiryDate(moment(new Date(d)).format('YYYY-MM-DD'))
                                                                }}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Typography variant="h6">Transmission</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setTransmission(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">COE Period</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setCOEPeriod(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Power</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setPower(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Accident Free</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setAccidentFree(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Engine No.</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setEngineNo(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Typography variant="h6">COE</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setCOE(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Vehicle Attachment</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setVehicleAttachment(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Purchase From</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setPurchaseFrom(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Chassis No.</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setChassisNo(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">OMV</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setOMV(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Typography variant="h6">Max Landen Weight</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setMaxLadenWeight(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Veh. Scheme</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setVehScheme(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Fuel Type</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setFuelType(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">ARF</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setARF(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6">Unlanden Weight</Typography>
                                                            <TextField id="outlined-basic" variant="outlined" onChange={(e) => {
                                                                setUnladenWeight(e.target.value)
                                                            }}/>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                            <br></br>

                                            {/* Bidding button */}
                                            <TableRow>
                                                <Button variant="contained" onClick={submitAddBidCar}>Add Car</Button>
                                                &nbsp;&nbsp;
                                                <Button
                                                    variant="contained" 
                                                    component={RouterLink}
                                                    to="../biddingcarsinfo"
                                                    color={'warning'}
                                                >
                                                    Cancel
                                                </Button>
                                            </TableRow>
                                        </Stack>
                                    </Stack>
                                </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </MainCard>
            </Grid>
            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
        </Grid>
        </>
    );
};

export default AddBidCars;
