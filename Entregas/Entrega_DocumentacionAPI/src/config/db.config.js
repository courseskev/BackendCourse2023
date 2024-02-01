import mongoose from "mongoose";
import configVar from "../config/config.js"

const URI = configVar.mongoUri;

mongoose
    .connect(URI)
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.log("Error connecting to Mongo DB.", error))