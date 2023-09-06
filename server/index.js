import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import { connect } from "mongoose";
import router from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error-middleware.js";

const PORT = process.env.PORT;
if (!PORT) {
  console.log("PORT was not defined");
}
const url = process.env.DATABASE_URL;
if (!url) {
  console.log("url was not defined");
}

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(errorMiddleware);

connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log(`DB connection error: ${error}`));

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

console.log("server");
