const {Schema, model} = require("mongoose");

const listSchema = new Schema({
  title: {
    type: String,
    default: 'General List',
    required: true
  },
  exercises: [
    {
      exerciseId: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true
      }
    }
  ]
})

module.exports = model('List', listSchema);