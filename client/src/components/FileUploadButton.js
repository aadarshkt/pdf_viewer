import React, { useState } from "react";
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import { Box, Button } from "@mui/material";

export default function FileUploadButton({ handleFileChange, label}) {
  return (
    <Box sx={{display: 'flex', px: 2}}>
      <input
        accept="application/pdf"
        style={{ display: "none" }}
        id="contained-button-file"
        type="file"
        onChange={(e) => handleFileChange(e, "button")}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          startIcon={<BackupRoundedIcon />}
          component="span"
        >
          {label}
        </Button>
      </label>
    </Box>
  );
}