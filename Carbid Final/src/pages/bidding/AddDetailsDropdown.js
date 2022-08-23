import { useState } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

// ========================================|| BIDDING PAGE (AddDetailsDropdown) STYLING ||======================================== //
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));
  
const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

// ========================================|| BIDDING PAGE (AddDetailsDropdown) FUNCTIONS ||======================================== //
const CustomizedAccordions = ({car}) => {
    // Addtional details open close functions --------------------------------------------------
    const [expanded, setExpanded] = useState();

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };


// ========================================|| BIDDING PAGE (AddDetailsDropdown) RENDER ||======================================== //
    return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Additional Details</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {/* CONTENT GRID START */}
                    <Grid container rowSpacing={5} columnSpacing={1}>

                    {/* GRID ITEM 1 - Additonal Details */}
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                                                    
                        {/* Column 1 */}
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Stack spacing={2}>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>First Registration</Typography>
                                    <Typography variant="subtitle1">{car.FirstRegistration}</Typography>
                                </Stack>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>PARF Expiry Date</Typography>
                                    <Typography variant="subtitle1">{car.PARFExpiryDate}</Typography>
                                </Stack>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Accident Free</Typography>
                                    <Typography variant="subtitle1">{car.AccidentFree ? 'Yes' : 'No'}</Typography>
                                </Stack>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Purchase From</Typography>
                                    <Typography variant="subtitle1">{car.PurchaseFrom}</Typography>
                                </Stack>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Veh. Scheme</Typography>
                                    <Typography variant="subtitle1">{car.VehScheme}</Typography>
                                </Stack>
                            </Stack>
                        </Grid>

                        {/* Column 2 */}
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Stack spacing={2}>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Inspection Due</Typography>
                                    <Typography variant="subtitle1">{car.InspectionDue}</Typography>
                                </Stack>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Transmission</Typography>
                                    <Typography variant="subtitle1">{car.Transmission}</Typography>
                                </Stack>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Engine No.</Typography>
                                    <Typography variant="subtitle1">{car.EngineNo}</Typography>
                                </Stack>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Chassis No.</Typography>
                                    <Typography variant="subtitle1">{car.ChassisNo}</Typography>
                                </Stack>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Fuel Type</Typography>
                                    <Typography variant="subtitle1">{car.FuelType}</Typography>
                                </Stack>
                            </Stack>
                        </Grid>

                        </Grid>
                    </Grid>

                    {/* GRID ITEM 2 - Additonal Details */}
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                                                    
                        {/* Column 3 */}
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Stack spacing={2}>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>COE Category</Typography>
                                    <Typography variant="subtitle1">{car.COECategory}</Typography>
                                </Stack>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>COE Period</Typography>
                                    <Typography variant="subtitle1">{car.COEPeriod}</Typography>
                                </Stack>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>COE</Typography>
                                    <Typography variant="subtitle1">${car.COE.toLocaleString("en-US")}</Typography>
                                </Stack>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>OMV</Typography>
                                    <Typography variant="subtitle1">${car.OMV.toLocaleString("en-US")}</Typography>
                                </Stack>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>ARF</Typography>
                                    <Typography variant="subtitle1">${car.ARF.toLocaleString("en-US")}</Typography>
                                </Stack>
                            </Stack>
                        </Grid>

                        {/* Column 4 */}
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Stack spacing={2}>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Engine Capacity</Typography>
                                    <Typography variant="subtitle1">{car.EngineCapacity} CC</Typography>
                                </Stack>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Power</Typography>
                                    <Typography variant="subtitle1">{car.Power} kW ({Math.round(Number(car.Power) * 1.34102)} bhp)</Typography>
                                </Stack>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Vehicle Attachment</Typography>
                                    <Typography variant="subtitle1">{car.VehicleAttachment}</Typography>
                                </Stack>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Max Laden Weight</Typography>
                                    <Typography variant="subtitle1">{car.MaxLadenWeight} kg</Typography>
                                </Stack>
                                <Stack spacing={0} justifyContent="center" alignItems="center">
                                    <Typography variant="h6" sx={{ color: "LightSlateGrey", whiteSpace: "nowrap" }}>Unladen Weight</Typography>
                                    <Typography variant="subtitle1">{car.UnladenWeight} kg</Typography>
                                </Stack>
                            </Stack>
                        </Grid>

                        </Grid>            
                    </Grid>

                    </Grid>
                    {/* CONTENT GRID START */}
                </AccordionDetails>
            </Accordion>
        </>
    );

  }
  
export default CustomizedAccordions;
