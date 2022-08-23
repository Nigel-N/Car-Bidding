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
import { useState, useEffect } from 'react';
import Label from './Label';
import axios from 'axios';
import moment from 'moment';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL;

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const TABLE_HEAD = [
    { id: 'make', label: 'Make', alignRight: false },
    { id: 'model', label: 'Model', alignRight: false },
    { id: '' }
];

const AllCars = () => {
    const [favourite, setFavourite] = useState([]);
    const [search, setSearch] = useState('');
    const current = moment().format('DD-MM-YYYY');

    const getFavouriteData = async () => {
        try {
            const data = await axios.get(`${url}/addFavList`);
            setFavourite(data.data);
            console.log(favourite)
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getFavouriteData();
    }, []);


    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const navigate = useNavigate();

    const selectCar = async (e) => {
        e.preventDefault()
        let id = e.target.getAttribute("data-carid")
        let carmodel = e.target.getAttribute("date-carmodel")
        let carmake = e.target.getAttribute("date-carmake")
        navigate('/addbidcars',{state:{carid:id,make:carmake,model:carmodel}});
    };

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 4 */}
            <Grid item xs={12} sx={{ mb: -2.25 }} style={{ display: 'flex' }}>
                <Typography variant="h5">&nbsp;Choose&nbsp;The&nbsp;Car&nbsp;Make&nbsp;&&nbsp;Model</Typography>
                <Grid container justifyContent="flex-end">
                    <Button size="small" component={RouterLink} to="../biddingcarsinfo" color={'primary'} variant="contained">
                        Back
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
                            <FavouriteListHead headLabel={TABLE_HEAD} />
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
                                                <TableCell padding="checkbox" align="left">
                                                    <Button size="medium" color={'primary'} variant="contained" data-carid={item.CarID} date-carmodel={item.CarModel} date-carmake={item.CarMake} onClick={ selectCar }>
                                                        Select
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
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

export default AllCars;
