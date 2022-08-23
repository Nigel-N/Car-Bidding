import Axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';

import { 
	Button,
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TablePagination,
	TableRow,
	TableHead,
	Paper,
	IconButton
} from '@mui/material';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

const url = process.env.REACT_APP_API_URL;

// ========================================|| SELECTED BIDS PAGE (TablePaginationActions) FUNCTIONS ||======================================== //
function TablePaginationActions(props) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event) => {
	onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
	onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
	onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
	onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
	<Box sx={{ flexShrink: 0, ml: 2.5 }}>
		<IconButton
		onClick={handleFirstPageButtonClick}
		disabled={page === 0}
		aria-label="first page"
		>
		{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
		</IconButton>
		<IconButton
		onClick={handleBackButtonClick}
		disabled={page === 0}
		aria-label="previous page"
		>
		{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
		</IconButton>
		<IconButton
		onClick={handleNextButtonClick}
		disabled={page >= Math.ceil(count / rowsPerPage) - 1}
		aria-label="next page"
		>
		{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
		</IconButton>
		<IconButton
		onClick={handleLastPageButtonClick}
		disabled={page >= Math.ceil(count / rowsPerPage) - 1}
		aria-label="last page"
		>
		{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
		</IconButton>
	</Box>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};


// ========================================|| SELECTED BIDS PAGE (SelectedBidUsersTable) FUNCTIONS ||======================================== //
const SelectedBidUsersTable = ({bidCarId}) => {
	// Pagination functions --------------------------------------------------
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};


	// Select bid functions --------------------------------------------------
	const [users, setUsers] = useState([]);

	const selectedBidsData = () => {
		Axios.get(`${url}/selectBids/${bidCarId}`)
		.then((res) => {    
			const users = res.data; // User Data
			setUsers(users);
		})
		.catch((error) => {
			console.log(error);
		})

    }


	// Check awarded bids functions --------------------------------------------------
	const [awards, setAwards] = useState({});

	const  bidAwarded = () => {
		// Get current date in YYYY-MM-DD
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        // const currentDate = `${year}-${month}-${day}`;

        // Test date
        const currentDate = "2022-08-20";
		
		Axios.get(`${url}/bidAwarded`, { params: { bidCarId: bidCarId, bidDate: currentDate } })
		.then((res) => {    
			const awardData = res.data; // Award Data
			awardData[0] === undefined ?
			setAwards({AwardBid: "non", UserID: "non"}) :
			setAwards(awardData[0]);
		})
		.catch((error) => {
			console.log(error);
		})

    }


	// Award bid functions --------------------------------------------------
	const handleAwardBid = (e, bidcarid, userid) => {
		Axios.put(`${url}/awardBid`,
		{
			bidCarId: bidcarid,
			userId: userid
		}
		)
		.then(response => {
			response.status === 200 ? console.log("Bid Awarded") : console.log("Bid award failed")
			
			if (response.status === 200) {
				console.log(response);
				window.location.reload(false);
			}
			else if (response.status === 401 || response.status === 501) {
				console.log("Invalid bidding parameters");
			}
			else {
				console.log("Random error occured");
			}

		})
		.catch((error) => console.log(error)) 
	}

	const handleUnadwardBid = (e, bidcarid, userid) => {
		Axios.put(`${url}/unawardBid`,
		{
			bidCarId: bidcarid,
			userId: userid
		}
		)
		.then(response => {
			response.status === 200 ? console.log("Bid Unwarded") : console.log("Bid Unaward failed")
			
			if (response.status === 200) {
				console.log(response);
				window.location.reload(false);
			}
			else if (response.status === 401 || response.status === 501) {
				console.log("Invalid bidding parameters");
			}
			else {
				console.log("Random error occured");
			}

		})
		.catch((error) => console.log(error)) 
	}


    // Runs once on first render
	useEffect(() => {
		selectedBidsData();
		bidAwarded();
	}, []);


// ========================================|| SELECTED BIDS PAGE (SelectedBidUsersTable) RENDER ||======================================== //
	return (
	<TableContainer component={Paper}>
		<Table sx={{ minWidth: 500 }} stickyHeader aria-label="custom sticky pagination table">
			<TableHead>
				<TableRow>
					<TableCell
						key='userid'
						style={{ minWidth: 100}}
						align="center"
					>
						User ID
					</TableCell>
					<TableCell
						key='name'
						align="center"
						style={{ minWidth: 100}}
					>
						Name
					</TableCell>
					<TableCell
						key='bidammount'
						align="center"
						style={{ minWidth: 100}}
					>
						Bid Ammount
					</TableCell>
					<TableCell
						key='buttons'
						align="right"
						style={{ minWidth: 30}}
					>
					</TableCell>
				</TableRow>
			</TableHead>

			<TableBody>
				{(rowsPerPage > 0
				? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				: users
				).map((user, index) => (
				<TableRow key={user.UserID}>
					{/* USER ID */}
					<TableCell component="th" scope="row" align="center">
						#{user.UserID} {index == 0 ? "(Highest Bid)" : ""}
					</TableCell>

					{/* Name */}
					<TableCell component="th" scope="row" align="center">
						{user.UserFirstName + " " + user.UserLastName}
					</TableCell>

					{/* BID AMMOUNT */}
					<TableCell component="th" scope="row" align="center">
						{"$ " + user.ActualBid}
					</TableCell>
					
					{/* BUTTONS */}
					<TableCell component="th" scope="row" align="right">
						{/* AWARD BID */}
						{user.BidStatus == "Bid Won" ?
							<Button variant="contained" color="error" onClick={(e) => handleUnadwardBid(e, user.BidCarID, user.UserID)}>Unaward Bid</Button>:
							
							awards.UserID == "non" ? 
								<Button variant="contained" onClick={(e) => handleAwardBid(e, user.BidCarID, user.UserID)} >Award bid</Button> :
								<Button variant="contained" disabled>Bid Lost</Button> 
									
						}

						&nbsp;&nbsp;&nbsp;&nbsp;

						{/* VIEW MORE */}
						<Button variant="outlined" color="secondary">View more</Button>
					</TableCell>
						
				</TableRow>
				))}

				{/* PAGINATION STUFF */}
				{emptyRows > 0 && (
				<TableRow style={{ height: 53 * emptyRows }}>
					<TableCell colSpan={6} />
				</TableRow>
				)}

			</TableBody>

			<TableFooter>
				{/* PAGINATION BAR */}
				<TableRow>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
					colSpan={3}
					count={users.length}
					rowsPerPage={rowsPerPage}
					page={page}
					SelectProps={{
					inputProps: {
						'aria-label': 'rows per page',
					},
					native: true,
					}}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					ActionsComponent={TablePaginationActions}
				/>
				</TableRow>
			</TableFooter>

		</Table>
	</TableContainer>
	);
}

export default SelectedBidUsersTable;
