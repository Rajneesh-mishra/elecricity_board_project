import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import api from "../../services/apiService";
import { Alert, Box, Snackbar, TablePagination, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ViewConnectionDialog from "./ViewConnectionDialog";
import EditRowDialog from "./EditConnectionDialog";
import _ from 'lodash';


export default function Connections() {
  const [connections, setConnections] = useState([]);
  const [page, setPage] = React.useState(0);
  const [edit, setEdit] = React.useState(null);
  const [view, setView] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showError, setShowError] = useState(false);

  const [selectedDate, setSelectedDate] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (event) => {
    const {name,value} = event.target
    setSelectedDate({...selectedDate,[name]:value});
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //debouncing search so that we can hold the API req until user finishes typing 
  // P.S can be done without lodash but using due to time constraint
  const handleSearch = _.debounce((event) => {
    const {value} = event.target;
    setSearchQuery(value);
  }, 500);



  const handleEdit = (row) => setEdit(row);
  const handleSnackbarClose = (row) => setShowError(false);
  const handleViewClose = () => setView(null);
  const handleView = (row) => setView(row);
  const handleEditClose = () => setEdit(null);
  const handleUpdate = async(data) => {
    try{
      const response = await api.put(`/electricity-connection/${data.id}`,data)
      if(response.status==="success"){
        handleEditClose()
        fetchConnections()
      }
    }catch(error){
      setShowError(true)
    }
  }
  
  const fetchConnections = async () => {
    const params = {
      skip: searchQuery?0:page,
      limit: rowsPerPage,
      applicant_id:searchQuery || null,
      start_date:selectedDate.startDate||null,
      end_date:selectedDate.endDate||null,
    };
    try {
      const response = await api.get("/electricity-connection/", { params });
      setConnections(response);
    } catch (error) {
      console.error("Error fetching connections:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage,searchQuery,selectedDate]);
  return (
    <>
  <Snackbar open={showError} autoHideDuration={6000} anchorOrigin={{vertical:"top",horizontal:"right"}} onClose={handleSnackbarClose}>
  <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
   Failed to update connection. Please try again later
  </Alert>
</Snackbar>
      {view && <ViewConnectionDialog
        open={view}
        onClose={handleViewClose}
        row={view}
      />}
     {edit && <EditRowDialog
        open={edit}
        onClose={handleEditClose}
        row={edit}
        onSave={handleUpdate}
      />}
      <Box padding="20px">
      <Paper>
        <Box display="flex" width="100%" alignItems='center' justifyContent="space-between" >
        <Typography variant="h5" margin={4} gutterBottom fontWeight={500}>
          Electricity Connections
        </Typography>
        <Box margin={4} display="flex" justifyContent="center" alignItems="center">
          <TextField
            label="Search by Applicant ID"
            size="small"
            type='number'
            variant="outlined"
            onChange={handleSearch}
          />
        <Box margin={1} display="flex"   justifyContent="center" alignItems="center">

          <TextField
            label="Start Date"
            size="small"
            InputLabelProps={{ shrink: true }}
            type='date'
            name="startDate"
            variant="outlined"
            onChange={handleDateChange}
          /><h2>-</h2>
            <TextField
            label="End Date"
            name="endDate"
            InputLabelProps={{ shrink: true }}
            size="small"
            type='date'
            variant="outlined"
            onChange={handleDateChange}
          />
          </Box>
        </Box>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Applicant Name</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Date of Application</TableCell>
                <TableCell align="left">Govt ID Type</TableCell>
                <TableCell align="right">ID Number</TableCell>
                <TableCell align="right">Load Applied (KV)</TableCell>
                <TableCell align="left">Ownership</TableCell>
                <TableCell align="left">Reviewer Name</TableCell>
                <TableCell align="left">State</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {connections?.data?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.applicant_name}
                  </TableCell>
                  <TableCell align="left">{row.category}</TableCell>
                  <TableCell align="left">{row.date_of_application}</TableCell>
                  <TableCell align="left">{row.govt_id_type}</TableCell>
                  <TableCell align="right">{row.id_number}</TableCell>
                  <TableCell align="right">{row.load_applied_in_kv}</TableCell>
                  <TableCell align="left">{row.ownership}</TableCell>
                  <TableCell align="left">{row.reviewer_name}</TableCell>
                  <TableCell align="left">{row.state}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton color="primary" onClick={() => handleView(row)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={connections?.count || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
</Box>
    </>
  );
}
