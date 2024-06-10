import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouters from "./routes/userRoutes.js";

const app = express();

dotenv.config();
//midleware
app.use(cors()); // it helps to make request from the cross origin platform

app.use(express.json()); // it use to parse the JSON data in the req. body
//when content type application/json request made from the frontend
//then it will parse the json data and make avialable to the req.body

//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected successfully!"))
  .catch((err) => {
    console.log("error occured", err);
  });

app.use("/api/v1",userRouters);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
