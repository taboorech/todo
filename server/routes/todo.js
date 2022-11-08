const {Router} = require('express');
const auth = require('../middleware/auth');
const exercise = require('../models/exercise');
const router = Router();
const Exercise = require('../models/exercise');
const List = require('../models/list');

function mapLists(lists) {
  return lists.map(list => ({
    id: list.listId.id,
    listName: list.listId.title
    // exercises: [...list.exercises]
  }))
}

function mapExercises(exercises) {
  return exercises.map(exercise => ({ 
    id: exercise.exerciseId.id,
    title: exercise.exerciseId.title,
    date: exercise.exerciseId.date,
    description: exercise.exerciseId.description,
    complete: exercise.exerciseId.complete
  }))
}

router.get('/lists', auth, async (req, res) => { 
  try {
    const user = await req.user.populate('lists.listId');
    const lists = mapLists(user.lists);
    res.status(200).json({lists});
  } catch (error) {
    console.log(error);
  }
})

// GET EXERCISES ?? POST ??
router.post('/exercises', auth, async (req, res) => {
  try {
    const list = await List.findById(req.body.listId).populate('exercises.exerciseId');
    const exercises = mapExercises(list.exercises);
    res.status(200).json({exercises});
  } catch(error) {
    console.log(error);
  }
})

router.post('/create-exercise', async (req, res) => {
  const list = await List.findById(req.body.listId);
  const exercise = new Exercise({
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    complete: false
  });
  await exercise.save();
  await list.addExercise(exercise);
  res.status(201).json({exercise});
});

router.post('/create-list', async (req, res) => {
  const list = new List({
    title: req.body.title
  });
  await list.save();
  await req.user.addList(list);
  res.status(201).json({list});
});

router.put('/exercise-complete', async (req, res) => {
  await Exercise.findByIdAndUpdate(req.body.id, {complete: req.body.complete});
  res.status(204).json({});
})

router.put('/exercise-update', async (req, res) => {
  const {id, title, date, description} = req.body;
  await Exercise.findByIdAndUpdate(id, {title, date, description});
  res.status(204).json({});
})

router.put('/list-update', async (req, res) => {
  const {id, title} = req.body;
  await List.findByIdAndUpdate(id, {title});
  res.status(204).json({});
})

router.delete('/exercise-delete', async (req, res) => {
  const list = await List.findById(req.body.listId);
  const exercise = await Exercise.findByIdAndDelete(req.body.id);
  await list.removeExercise(exercise);
  res.status(204).json({});
})

router.delete('/list-delete', async (req, res) => {
  if(req.user.lists.length <= 1) {
    return res.status(403).json({}); 
  }  
  const list = await List.findByIdAndDelete(req.body.listId);
  list.exercises.map(async ({exerciseId}) => {
    await Exercise.findByIdAndDelete(exerciseId);
  });
  await req.user.removeList(list);
  return res.status(204).json({});
})

module.exports = router;