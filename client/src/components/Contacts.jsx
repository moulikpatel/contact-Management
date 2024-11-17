import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import {
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';  // Import toast

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

export default function CustomPaginationActionsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/contacts/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();  

      if (data.success) {
        
        setRows(rows.filter((row) => row.id !== id));

        toast.success(data.message);
      } else {
     
        toast.error(data.message || 'Error deleting user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('An error occurred while deleting the user');
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/contacts');
        const data = await response.json();

        if (Array.isArray(data.users)) {
          setRows(data.users);  
        } else {
          console.error('Data.users is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [handleDelete]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  

  const handleUpdate = (row) => {
    setCurrentRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRow(null);
  };

  const handleSave = () => {
    const updatedRows = rows.map((row) =>
      row.id === currentRow.id ? currentRow : row
    );
    setRows(updatedRows);
    handleClose();
  };
  const handleSavee = async () => {
    try {
     
      const response = await fetch(`http://localhost:3000/contact/${currentRow._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: currentRow.firstName,
          lastName: currentRow.lastName,
          email: currentRow.email,
          phoneNumber: currentRow.phoneNumber,
          company: currentRow.company,
          jobTitle: currentRow.jobTitle,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
       
        const updatedRows = rows.map((row) =>
          row._id === currentRow._id ? { ...row, ...currentRow } : row
        );
        setRows(updatedRows);
  
        // Show success toast
        toast.success(data.message || 'User updated successfully');
        handleClose();  // Close the dialog
      } else {
        // If there's an error, show error toast
        toast.error(data.message || 'Error updating user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('An error occurred while updating the user');
    }
  };
  

  const handleInputChange = (field, value) => {
    setCurrentRow({ ...currentRow, [field]: value });
  };

  return (
    <>
      <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table sx={{ minWidth: 800 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.jobTitle}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleUpdate(row)}
                    sx={{ marginRight: 1 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(row._id)}  
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={7}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Dialog for Update */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Record</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            fullWidth
            value={currentRow?.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={currentRow?.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={currentRow?.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            value={currentRow?.phoneNumber || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Company"
            fullWidth
            value={currentRow?.company || ''}
            onChange={(e) => handleInputChange('company', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Job Title"
            fullWidth
            value={currentRow?.jobTitle || ''}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSavee} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
