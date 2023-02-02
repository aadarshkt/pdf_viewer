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
const PORT = process.env.PORT || 8000;

app.post("/upload", upload.single("file"), (req, res) => {
  // Read the contents of the uploaded file
  //name type file req.body
  const file = fs.readFileSync(req.file.path);
  console.log(file);

  // Connect to the database
  const connection = mysql.createConnection({
    host: "bg5alo4qlrir0nvgxx6w-mysql.services.clever-cloud.com",
    user: "u4hhscgwqzlyi3o5",
    password: "cWLwkcT2CplClB6VpIq8",
    database: "bg5alo4qlrir0nvgxx6w",
  });

  //database connection
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  // Store the file in the database
  const query = "INSERT INTO files (name, file) VALUES (?, ?)";
  connection.query(query, [req.file.originalname, file], (error, results, fields) => {
    if (error){console.log("Error is generated" + error)};
    res.send("File Uploaded Sucessfully");                        
  });
});

app.listen(PORT, () => {
    console.log('Listening on port' + PORT + '!');
})
