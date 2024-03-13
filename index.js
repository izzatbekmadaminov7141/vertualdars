const express = require("express");
const app = express();
const mongoose = require("mongoose");
const categories = require("./router/cotegories");
const customerst = require("./router/customerst");

mongoose
  .connect("mongodb://localhost/vertualdars")
  .then(() => {
    console.log("MongoDB unlanish hosil qildi...");
  })
  .catch((err) => {
    console.log("MongoDBga ulanish vaqtida xatolik ro'y berdi...", err);
  });

app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/customers", customerst);

// Local Host
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(port, "chi portni eshitishni boshladim..");
});
