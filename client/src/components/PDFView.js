import pdfjs from "pdfjs-dist";
import React, { useEffect, useRef, useState } from "react";
import { Viewer, Worker, SpecialZoomLevel} from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Box } from "@mui/system";

const PDFView = ({ file }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Box>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.2.146/build/pdf.worker.min.js">
        <Box sx={{display: 'flex', width: '100%', height: '800px', p: 2}}>
            <Viewer fileUrl={file} plugins={[defaultLayoutPluginInstance]} defaultScale={SpecialZoomLevel.PageFit}/>
        </Box>
        </Worker>
    </Box>
  );
};

export default PDFView;
