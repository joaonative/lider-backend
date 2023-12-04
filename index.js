import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL);

app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
