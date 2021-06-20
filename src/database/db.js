require("dotenv").config();
const mongoose = require("mongoose");
const deb = require("debug")("Database Log");
const { repoSchema } = require("./schema/repoSchema");
const connectionString = process.env.MONGO_STRING;
// deb(connectionString);

mongoose
  .connect(connectionString)
  .then(() => deb("Connected to database"))
  .catch((err) => deb(err));

// const repoSchema = new mongoose.Schema({
//   guildId: Number,
//   repoCount: {
//     type: Number,
//     default: 0,
//   },
//   repo: [repoSchema],
// });

const Repo = mongoose.model("Repo", repoSchema);

module.exports = { Repo, deb };
