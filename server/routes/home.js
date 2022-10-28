const { Router } = require("express");
const router = Router();

router.get('/', async (req, res) => {
  res.json({"message": "123"})
})

module.exports = router;