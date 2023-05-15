const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Menu = new Schema(
  {
    description: {
      type: String,
    },
    name: {
      type: String,
    },
    preco: {
      type: Number,
    },
  },
  {
    collection: "menu",
  }
);

module.exports = mongoose.model("Menu", Menu);
