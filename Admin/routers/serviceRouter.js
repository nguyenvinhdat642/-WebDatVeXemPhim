const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/', serviceController.getAllServices);
router.post('/', serviceController.addService);
router.get('/delete/:id', serviceController.deleteService);
router.get('/edit/:id', serviceController.getAllServiceEdit);
router.post('/edit', serviceController.updateService);

module.exports = router;