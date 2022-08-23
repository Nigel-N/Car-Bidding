// material-ui
import { Typography } from '@mui/material';

// components
import TablePaginationActions from './TablePaginationActions';

// ========================================|| MANAGE USER FUNCTIONS ||======================================== //
const ManageUsersPage = () => {


// ========================================|| MANAGE USER RENDER ||======================================== //
    return(
        <>
        <Typography variant="h5">Manage Users</Typography>
        <br></br>
        <TablePaginationActions />
        </>
    );
};

export default ManageUsersPage;
