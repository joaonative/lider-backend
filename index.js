import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import reviewRoute from "./routes/review.js";
import productRoute from "./routes/product.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Conectado ao MongoDB");

    app.use("/register", registerRoute);
    app.use("/login", loginRoute);
    app.use("/product", productRoute);
    app.use("/review", reviewRoute);

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
  });
