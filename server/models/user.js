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
      ref: 'List'
    }
  }]
})

userSchema.methods.addList = function (list) {
  const lists = [...this.lists];
  lists.push({listId: list.id});
  this.lists = lists;
  return this.save();
}

module.exports = model('User', userSchema);