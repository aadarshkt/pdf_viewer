const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors());
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const multer = require("multer");
const fs = require("fs");
const mysql = require("mysql2");
const { execSync } = require('child_process');
const upload = multer({dest: "uploads/", limits:{fieldSize: 25 * 1024 * 1024}});

app.post("/upload", upload.single("file"), (req, res) => {
  // Read the contents of the uploaded file
  //name type file req.body
  const inputPath = req.file.path;
  const outputPath = `compressed-${req.file.originalname}`;

  execSync(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputPath} ${inputPath}`);

  fs.stat(outputPath, (error, stats) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error while compressing file');
    } else {
      console.log(`File size reduced to ${stats.size} bytes`);
      res.send('File compressed successfully');
    }
  });

  console.log(req.file);
  const file = fs.readFileSync(req.file.path);

  // Connect to the database
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "17291729",
    database: "filedatabase",
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  // Store the file in the database
  const query = "INSERT INTO files (name, file) VALUES (?, ?)";
  connection.query(query, [req.file.originalname, file], (error, results, fields) => {
    if (error){console.log("Error is generated" + error)};
    res.send(results + fields);                        
  });
});

app.listen(8000, () => {
    console.log('Listening on port 8000!');
})
