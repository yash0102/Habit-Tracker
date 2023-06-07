const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');
// const habitController = require('../controller/habitController');

router.get("/", homeController.home);

router.post('/addHabit', homeController.addHabit);

module.exports = router;