require("dotenv").config();
const mongoose = require("mongoose");
const deb = require("debug")("db.js: ");
const { repoSchema } = require("./schema/repoSchema");
const connectionString = process.env.MONGO_STRING;
// deb(connectionString);

mongoose
  .connect(connectionString)
  .then(() => deb("Connected to database"))
  .catch((err) => deb(err));

const Repo = mongoose.model("Repo", repoSchema);

module.exports = { Repo, deb };
