import express, { json } from "express";
import colors from "colors";
import { config } from "dotenv";

import { default as connectDB } from "./config/db.js";

//MiddleWares


//config ENV
config();

//Database Config
connectDB()

//Routes

import app from './app.js';

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`.bgCyan.white);
});
