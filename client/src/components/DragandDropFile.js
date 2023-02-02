import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";
import { IconButton } from '@mui/material';
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
          m: 25,
          width: "100%",
          height: "100%",
          border: "1px dashed",
          borderColor: "black",
          borderRadius: '3%',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input {...getInputProps()} type="file"/>
        <IconButton>
          <BackupRoundedIcon />
        </IconButton>
        <p>Drag and drop some files here, or click to select files</p>
      </Box>
  );
}

export default DragandDropFile;
