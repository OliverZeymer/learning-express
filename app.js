import express from "express";
import database from "./routes/database/index.js";
const app = express();
const port = 3000;
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
database(app);
app.listen(port, function () {
  console.log("Server is running on port 3000");
});
