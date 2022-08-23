import PropTypes from 'prop-types';
// material
import {
    Box,
    Radio,
    Stack,
    Button,
    Drawer,
    Rating,
    Divider,
    Checkbox,
    FormGroup,
    IconButton,
    Typography,
    RadioGroup,
    FormControlLabel
} from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import DatePicker from 'react-date-picker';
import React, { useState } from 'react';
import moment from 'moment';

// ----------------------------------------------------------------------

export const FILTER_STATUS_OPTIONS = ['All', 'Bid Won', 'Bid Lost', 'Pending'];
export const FILTER_BATCH_OPTIONS = ['All', 'Last 7 days', 'Last 14 days', 'Last 30 days', 'Selected date'];
export const FILTER_BATCH_VALUES = ['All', 7, 14, 30, 'Selected date'];

// ----------------------------------------------------------------------

PastBidsFilterSideBar.propTypes = {
    isOpenFilter: PropTypes.bool,
    onOpenFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,
    onFilterStatus: PropTypes.func,
    onFilterStatusCheck: PropTypes.func,
    onFilterBidDate: PropTypes.func,
    onFilterBidDateCheck: PropTypes.func,
    onFilterSelectedDate: PropTypes.func
};

export default function PastBidsFilterSideBar({
    isOpenFilter,
    onOpenFilter,
    onCloseFilter,
    onFilterStatus,
    onFilterStatusCheck,
    onFilterBidDate,
    onFilterBidDateCheck,
    onFilterSelectedDate
}) {
    const [value, onChange] = useState();
    const [Cdate, setDate] = useState(new Date());

    return (
        <>
            <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
                Filters&nbsp;
            </Button>

            <Drawer
                anchor="right"
                open={isOpenFilter}
                onClose={onCloseFilter}
                PaperProps={{
                    sx: { width: 280, border: 'none' }
                }}
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>
                        Filters
                    </Typography>
                    <IconButton onClick={onCloseFilter}>
                        <Iconify icon="eva:close-fill" width={20} height={20} />
                    </IconButton>
                </Stack>

                <Divider />

                <Scrollbar>
                    <Stack spacing={5} sx={{ p: 3 }}>
                        <div>
                            <Typography variant="subtitle1" gutterBottom>
                                Status
                            </Typography>
                            <RadioGroup>
                                {FILTER_STATUS_OPTIONS.map((item) => {
                                    return (
                                        <FormControlLabel
                                            key={item}
                                            value={item}
                                            control={<Radio />}
                                            label={item}
                                            onChange={onFilterStatus}
                                            checked={item === onFilterStatusCheck}
                                        />
                                    );
                                })}
                            </RadioGroup>
                        </div>
                        <div>
                            <Typography variant="subtitle1" gutterBottom>
                                Time
                            </Typography>
                            <RadioGroup>
                                {FILTER_BATCH_OPTIONS.map((item) => (
                                    <FormControlLabel
                                        key={item}
                                        value={item}
                                        control={<Radio />}
                                        label={item}
                                        onChange={onFilterBidDate}
                                        checked={item === onFilterBidDateCheck}
                                    />
                                ))}
                            </RadioGroup>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <DatePicker
                                dateFormat="yyyy-MM-dd"
                                value={Cdate}
                                onChange={(onFilterSelectedDate) => {
                                    const d = new Date(onFilterSelectedDate);
                                    console.log(moment(new Date(d)).format('YYYY-MM-DD'));
                                    setDate(d);
                                }}
                            />
                            {/* {moment(new Date(Cdate)).format('YYYY-MM-DD')} */}
                        </div>
                    </Stack>
                </Scrollbar>
            </Drawer>
        </>
    );
}
