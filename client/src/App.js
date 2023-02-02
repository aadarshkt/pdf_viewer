import FileUploadButton from "./components/FileUploadButton";
import { useEffect, useState } from "react";
import PDFView from "./components/PDFView";
import { Box } from "@mui/system";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import DragandDropFile from "./components/DragandDropFile";
import Header from "./components/Header";

function App() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null)
  const [name, setName] = useState(null);

  const handleDrop = (target) => {
    const selectedFile = target[0];
    if (selectedFile === null || selectedFile.type !== "application/pdf") {
      alert("Please select a PDF file");
    }
    const name = selectedFile.name;
    setName(name);
    setFileUrl(selectedFile);
    console.log(selectedFile);

    //For Showing on Frontend
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = (e) => {
      setFile(e.target.result);
    };
  };
  const handleFileChange = (e, type) => {
    let selectedFile;
    if(type === "button")selectedFile = e.target.files[0];
    else selectedFile = e[0];
    if (selectedFile === null || selectedFile.type !== "application/pdf") {
      alert("Please select a PDF file");
    }
    const name = selectedFile.name;
    setName(name);
    setFileUrl(selectedFile);
    console.log(selectedFile);

    //For Showing on Frontend
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = (e) => {
      setFile(e.target.result);
    };
  };
  const handleSubmit = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("file", fileUrl);
    console.log(name);
    await axios
      .post("http://localhost:8000/upload", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    };
  return (
    <Box sx={{ display: "flex", flexDirection: 'column', width: "100%", justifyContent: "center", alignItems: 'center'}}>
    <Header />
      {file ? (
        <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "center", p: 4, flexDirection: 'row', alignItems: 'center'}}>
            <FileUploadButton
              file={file}
              handleFileChange={handleFileChange}
              label="Upload new file"
            ></FileUploadButton>
            <Typography sx={{fontWeight: 'bold'}}>OR</Typography>
            <Button onClick={handleSubmit} variant="outlined" sx={{mx: 2}}>Submit this file</Button>
          </Box>
          <PDFView file={file} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: 'column', width: "100vh", height: '100vh', justifyContent: "center", alignItems: 'center'}}>
          <DragandDropFile file={file} handleFileChange={handleFileChange}/>
        </Box>
      )}
    </Box>
  );
}

export default App;
