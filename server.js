const mongoose = require("mongoose");

const app = require("./app");

// 8trROvdDe11DilYW

const DB_HOST =
  "mongodb+srv://SergiiNew:8trROvdDe11DilYW@cluster0.uvvqxha.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("All OK");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
