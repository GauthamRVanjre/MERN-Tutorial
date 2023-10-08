import express from "express";
import { PORT, DATABASE_URL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// middleware for parsing request body
app.use(express.json());

// option 1: allow all origins
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Hello World!");
});

app.use("/books", booksRoute);

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
