const {Router} = require('express')
const router = Router();
const Exercise = require('../models/exercise');
const List = require('../models/list');

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