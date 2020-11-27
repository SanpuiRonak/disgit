require("dotenv").config();
const mongoose = require("mongoose");
const deb = require("debug")("Database Log");
const { repoSchema } = require("./schema/repo");
const connectionString = process.env.MONGO_STRING;
// deb(connectionString);

mongoose
  .connect(connectionString)
  .then(() => deb("Connected to database"))
  .catch((err) => deb(err));

const guildSchema = new mongoose.Schema({
  guildId: Number,
  repoCount: {
    type: Number,
    default: 0,
  },
  repo: repoSchema,
});

const Guild = mongoose.model("Guild", guildSchema);

module.exports = { Guild, deb };
