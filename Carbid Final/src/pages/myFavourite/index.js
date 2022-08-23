// material-ui
import {
    Button,
    Grid,
    Typography,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Card,
    Stack,
    Avatar,
    TablePagination
} from '@mui/material';
import { FavouriteListHead } from './sections';
import { FavouriteListToolbar } from './sections';
import Iconify from '../../components/Iconify';
import { useState, useEffect } from 'react';
import Label from './Label';
import axios from 'axios';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL;

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const TABLE_HEAD = [
    { id: 'make', label: 'Make', alignRight: false },
    { id: 'model', label: 'Model', alignRight: false },
    { id: 'currentBid', label: 'Current Bid', alignRight: false },
    { id: '' }
];

const MyFavourite = () => {
    const [favourite, setFavourite] = useState([]);
    const [search, setSearch] = useState('');
    const current = moment().format('DD-MM-YYYY');

    const getFavouriteData = async () => {
        try {
            const data = await axios.get(`${url}/favourite`);
            setFavourite(data.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getFavouriteData();
    }, []);

    const deleteFavourite = async (event) => {
        const CarMake = event.target.getAttribute('data-carMake');
        const CarModel = event.target.getAttribute('data-carModel');
        if (window.confirm('Confirm to remove ' + CarMake + ' ' + CarModel + ' from your favourite?')) {
            axios.delete(`${url}/deleteFavourite`, { data: { favouriteID: event.target.id } });
            window.location.reload(false);
        }
    };

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 4 */}
            <Grid item xs={12} sx={{ mb: -2.25 }} style={{ display: 'flex' }}>
                <Typography variant="h5">&nbsp;My&nbsp;Favourite</Typography>
                <Grid container justifyContent="flex-end">
                    <Button
                        size="small"
                        component={RouterLink}
                        to="../addFavourite"
                        color={'primary'}
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        Add favourite
                    </Button>
                </Grid>
            </Grid>
            <br></br>
            <Grid item xs={48} sm={24} md={16} lg={12}>
                <Card>
                    <FavouriteListToolbar
                        onFilterName={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                    <TableContainer xs={48} sm={24} md={16} lg={12}>
                        <Table>
                            <FavouriteListHead headLabel={TABLE_HEAD} rowCount={favourite.length} />
                            <TableBody>
                                {favourite
                                    .filter((item) => {
                                        if (search == '') {
                                            return item;
                                        } else if (item.CarMake.toLowerCase().includes(search.toLowerCase())) {
                                            return item;
                                        } else if (item.CarModel.toLowerCase().includes(search.toLowerCase())) {
                                            return item;
                                        }
                                    })
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item) => {
                                        if (item.BidDate == current) {
                                            return (
                                                <TableRow>
                                                    <TableCell padding="checkbox">&nbsp;</TableCell>
                                                    <TableCell component="th" scope="row" padding="none">
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            <Avatar alt="logo" src={'/assets/images/mock/cars/' + item.CarLogo} />
                                                            <Typography variant="subtitle2" noWrap>
                                                                {item.CarMake}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell align="left">{item.CarModel}</TableCell>
                                                    <TableCell align="left">
                                                        <Label variant="ghost" color={'success'}>
                                                            In Current Bid
                                                        </Label>
                                                    </TableCell>
                                                    <TableCell padding="checkbox" align="left">
                                                        <Button
                                                            size="small"
                                                            id={item.FavouriteID}
                                                            onClick={deleteFavourite}
                                                            color={'error'}
                                                            variant="contained"
                                                        >
                                                            Remove
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        } else {
                                            return (
                                                <TableRow>
                                                    <TableCell padding="checkbox">&nbsp;</TableCell>
                                                    <TableCell component="th" scope="row" padding="none">
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            <Avatar alt="logo" src={'/assets/images/mock/cars/' + item.CarLogo} />
                                                            <Typography variant="subtitle2" noWrap>
                                                                {item.CarMake}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell align="left">{item.CarModel}</TableCell>
                                                    <TableCell align="left">-</TableCell>
                                                    <TableCell padding="checkbox" align="left">
                                                        <Button
                                                            size="small"
                                                            data-carMake={item.CarMake}
                                                            data-carModel={item.CarModel}
                                                            id={item.FavouriteID}
                                                            onClick={deleteFavourite}
                                                            color={'error'}
                                                            variant="contained"
                                                        >
                                                            Remove
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10]}
                        component="div"
                        count={favourite.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
        </Grid>
    );
};

export default MyFavourite;
