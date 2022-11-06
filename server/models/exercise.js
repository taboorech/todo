const {Schema, model} = require("mongoose");

const exerciseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: String,
  description: String,
  complete: {
    type: Boolean,
    required: true
  }
})

module.exports = model('Exercise', exerciseSchema);