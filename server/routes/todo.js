const {Router} = require('express')
const router = Router();
const Exercise = require('../models/exercise');

// const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/create-exercise', async (req, res) => {
  const exercise = new Exercise({
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    complete: false
  });
  await exercise.save();
  res.status(201).json({exercise});
})

module.exports = router;