const {Schema, model} = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  lists: [{
    listId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Lists'
    }
  }]
})

module.exports = model('User', userSchema);