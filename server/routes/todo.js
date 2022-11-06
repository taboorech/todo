const {Router} = require('express');
const exercise = require('../models/exercise');
const router = Router();
const Exercise = require('../models/exercise');
const List = require('../models/list');

function mapLists(lists) {
  return lists.map(list => ({
    // ...list.listId._doc, 
    id: list.listId.id,
    listName: list.listId.title
    // id: list.listId.id,
    // title: list.title,
    // exercises: [...list.exercises]
  }))
}

function mapExercises(lists) {
  return lists.map(list => ({
    // ...exercise.exerciseId._doc, 
    id: exercise.exerciseId.id,
  }))
}

router.get('/lists', async (req, res) => { 
  const user = await req.user.populate('lists.listId');
  const lists = mapLists(user.lists);
  res.status(200).json({lists});
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

module.exports = router;