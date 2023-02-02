import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";
import { IconButton, Typography } from '@mui/material';
import { Box } from "@mui/material";


function DragandDropFile({ file, handleFileChange }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": ['.pdf']
    },
    multiple: false,
    onDrop: (acceptedFile) => {
      handleFileChange(acceptedFile, "Drop");
    },
  });

  return (
      <Box
        {...getRootProps()}
        sx={{
          m: 10,
          p: 5,
          width: "40%",
          border: "1px dashed",
          borderColor: "white",
          borderRadius: '3%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input {...getInputProps()} type="file"/>
        <IconButton sx={{color: 'white'}}>
          <BackupRoundedIcon />
        </IconButton>
        <Typography poppins="true" sx={{color: "white"}}>Drag and drop some files here, or click to select files</Typography>
      </Box>
  );
}

export default DragandDropFile;
