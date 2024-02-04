import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditRowDialog = ({ row, open, onClose, onSave }) => {
  const theme = useTheme();
  const dialogStyles = {
    title: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    content: {
      padding: "15px",
    },
    buttonContainer: {
      marginTop: "13px",
    },
  };
  const [editedData, setEditedData] = useState(row || {});
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "load_applied_in_kv" && value > 200) return;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const isAnyFieldEmpty = Object.values(editedData).some(
      (value) => value === ""
    );
    if (isAnyFieldEmpty) {
      setShowError(true);
      return;
    }
    onSave(editedData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle style={dialogStyles.title} color="primary">
        <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">Edit Connection</Typography>
          <IconButton size="large" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent style={dialogStyles.content}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <TextField
              label="Applicant Name"
              name="applicant_name"
              value={editedData.applicant_name || ""}
              error={showError && !editedData.applicant_name}
              required
              helperText={
                showError && !editedData.applicant_name && "field required"
              }
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={showError && !editedData.category}
              required
              helperText={showError && !editedData.category && "field required"}
              label="Category"
              name="category"
              value={editedData.category || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={showError && !editedData.date_of_application}
              required
              helperText={
                showError && !editedData.date_of_application && "field required"
              }
              label="Date of Application"
              name="date_of_application"
              type="date"
              disabled
              value={editedData.date_of_application || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={showError && !editedData.date_of_approval}
              required
              helperText={
                showError && !editedData.date_of_approval && "field required"
              }
              label="Date of Approval"
              type="date"
              name="date_of_approval"
              value={editedData.date_of_approval || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={showError && !editedData.district}
              required
              helperText={showError && !editedData.district && "field required"}
              label="District"
              name="district"
              value={editedData.district || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={showError && !editedData.gender}
              required
              helperText={showError && !editedData.gender && "field required"}
              label="Gender"
              name="gender"
              value={editedData.gender || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={showError && !editedData.govt_id_type}
              required
              helperText={
                showError && !editedData.govt_id_type && "field required"
              }
              label="Government ID Type"
              disabled
              name="govt_id_type"
              value={editedData.govt_id_type || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              error={showError && !editedData.id_number}
              required
              helperText={
                showError && !editedData.id_number && "field required"
              }
              label="ID Number"
              name="id_number"
              disabled
              value={editedData.id_number || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={showError && !editedData.load_applied_in_kv}
              required
              helperText={
                showError && !editedData.load_applied_in_kv && "field required"
              }
              label="Load Applied"
              name="load_applied_in_kv"
              value={editedData.load_applied_in_kv || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">KV</InputAdornment>
                ),
              }}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={showError && !editedData.modified_date}
              required
              helperText={
                showError && !editedData.modified_date && "field required"
              }
              label="Modified Date"
              name="modified_date"
              type="date"
              value={editedData.modified_date || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={showError && !editedData.ownership}
              required
              helperText={
                showError && !editedData.ownership && "field required"
              }
              label="Ownership"
              name="ownership"
              value={editedData.ownership || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={showError && !editedData.pincode}
              required
              helperText={showError && !editedData.pincode && "field required"}
              label="Pincode"
              name="pincode"
              value={editedData.pincode || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={showError && !editedData.reviewer_comments}
              required
              helperText={
                showError && !editedData.reviewer_comments && "field required"
              }
              label="Reviewer Comments"
              name="reviewer_comments"
              value={editedData.reviewer_comments || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={showError && !editedData.reviewer_id}
              required
              helperText={
                showError && !editedData.reviewer_id && "field required"
              }
              label="Reviewer ID"
              name="reviewer_id"
              value={editedData.reviewer_id || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={showError && !editedData.reviewer_name}
              required
              helperText={
                showError && !editedData.reviewer_name && "field required"
              }
              label="Reviewer Name"
              name="reviewer_name"
              value={editedData.reviewer_name || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={showError && !editedData.state}
              required
              helperText={showError && !editedData.state && "field required"}
              label="State"
              name="state"
              value={editedData.state || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={showError && !editedData.status}
              required
              helperText={showError && !editedData.status && "field required"}
              label="Status"
              name="status"
              value={editedData.status || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
        </Grid>

        <div style={dialogStyles.buttonContainer}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRowDialog;
