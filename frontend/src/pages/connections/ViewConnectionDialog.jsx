import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from '@emotion/react';

const ViewConnectionDialog = ({ row, open, onClose, onSave }) => {
  const theme = useTheme();
  const dialogStyles = {
    title: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle style={dialogStyles.title} >
      <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">View Connection</Typography>
          <IconButton size="large" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent style={{ padding: '15px' }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b>  Applicant Name : </b>{row.applicant_name || ''}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b>  Category : </b>{row.category || ''}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b>  Date of Application : </b>{row.date_of_application || ''}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b>  Date of Approval : </b>{row.date_of_approval || ''}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b>  District : </b>{row.district || ''}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b>  Gender : </b>{row.gender || ''}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b>  Government ID Type : </b>{row.govt_id_type || ''}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b> ID Number : </b>{row.id_number || ''}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b> Load Applied : </b>{`${row.load_applied_in_kv} KV`|| ''}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b>  Modified Date : </b>{row.modified_date || ''}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b>  Ownership: </b>{row.ownership || ''}
            </Typography>
          </Grid>   <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b>  Pincode: </b>{row.pincode || ''}
            </Typography>
          </Grid>   <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b>  Reviewer Comments: </b>{row.reviewer_comments || ''}
            </Typography>
          </Grid>   <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b>  Reviewer ID: </b>{row.reviewer_id || ''}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b>  Reviewer Name: </b>{row.reviewer_name || ''}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b> State: </b>{row.state || ''}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" color="textPrimary">
            <b> Status: </b>{row.status || ''}
            </Typography>
          </Grid>
        </Grid>

  
      </DialogContent>
    </Dialog>
  );
};

export default ViewConnectionDialog;
