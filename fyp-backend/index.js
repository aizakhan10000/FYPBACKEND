const express = require('express');
const { MongoClient } = require("mongodb");
const app = express();
const axios = require("axios")
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const radiologistRouter = require('./Route/radiologistroute');
const patientRouter=require('./Route/patientroute');
const xRayRouter = require("./Route/xRayRoute")
const reportRouter = require("./Route/reportRoute")
require('dotenv').config()

const port = 3000;
const url = process.env.DB_URI

const cookieParser = require('cookie-parser');
const cors = require('cors');
// Connect to your Atlas cluster
// const client = new MongoClient(url);

// console.log(process.env)

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(url)
  .then(() => console.log('MongoDB Atlas is connected!'));
  
app.use("/radiologist", radiologistRouter);
app.use("/patient",patientRouter);
app.use("/xray",xRayRouter);
app.use("/report",reportRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

app.use(bodyParser.json());