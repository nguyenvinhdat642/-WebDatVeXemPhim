const express = require('express');
const router = express.Router();
const premiereController = require('../controllers/premiereController');

router.get('/', premiereController.getAllPremiere);
router.post('/add', premiereController.addPremiere);
router.get('/add', premiereController.addPremierePage);
router.get('/edit/:id', premiereController.getAllPremiereEdit);
router.post('/edit', premiereController.updatePremiere);

module.exports = router;