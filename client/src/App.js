import FileUploadButton from "./components/FileUploadButton";
import { useEffect, useState } from "react";
import PDFView from "./components/PDFView";
import { Box } from "@mui/system";
import axios from "axios";
import { Button, createTheme, Typography } from "@mui/material";
import DragandDropFile from "./components/DragandDropFile";
import Header from "./components/Header";
import { ThemeProvider } from "@emotion/react";
import SendIcon from '@mui/icons-material/Send';

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins"].join(","),
    allVariants: {
      color: "#000028",
    },
  },
});

function App() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e, type) => {
    let selectedFile;
    //one for frontend other for backendProcessing.
    if (type === "button") selectedFile = e.target.files[0];
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
    setLoading(true);
    await axios
      .post("http://localhost:8000/upload", data)
      .then((res) => {
        setLoading(false)
        console.log(res);
        alert("File sent to backend successfully.Check console for details.")
      })
      .catch((err) => console.log(err));
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center" }}
      >
        <Header />
        {file ? (
          <Box sx={{ display: "flex", flexDirection: 'column', width: "50%" }}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: 'center',
                p: 4,
                alignItems: "center",
              }}
            >
              <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <FileUploadButton
                file={file}
                handleFileChange={handleFileChange}
                label="Upload new file"
              ></FileUploadButton>
              <Typography sx={{ fontWeight: "bold" }} poppins="true">
                OR
              </Typography>
              <Button onClick={handleSubmit} variant="outlined" sx={{ mx: 2 }} endIcon={<SendIcon />}>
                Submit this file
              </Button>
              </Box>
              <Box>
              {loading ? <Typography poppins="true">sending...</Typography> : <></>}
              </Box>
            </Box>
            <PDFView file={file} />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <DragandDropFile file={file} handleFileChange={handleFileChange} />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
