import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import {
  Auth,
  Cash,
  User,
  Product,
  Buy,
  Recommendation,
} from "./routes/index.js";
import { dbConn } from "./config/dbConn.js";
import { corsOptions } from "./config/corsOptions.js";

dotenv.config();
dbConn();

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/auth", Auth);
app.use("/cash", Cash);
app.use("/user", User);
app.use("/product", Product);
app.use("/buy", Buy);
app.use("/recommendation", Recommendation);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
