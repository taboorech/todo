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
});

listSchema.methods.addExercise = function (exercise) {
  const exercises = [...this.exercises];
  exercises.push({exerciseId: exercise.id});
  this.exercises = exercises;
  return this.save();
}

listSchema.methods.removeExercise = function (exercise) {
  let exercises = [...this.exercises];
  exercises = exercises.filter((element) => element.exerciseId.toString() !== exercise._id.toString());
  this.exercises = exercises;
  return this.save();
}

module.exports = model('List', listSchema);