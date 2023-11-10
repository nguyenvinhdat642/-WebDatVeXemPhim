const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/', userController.addUser);
router.get('/delete/:id', userController.deleteUser);
router.get('/edit/:id', userController.getAllUserEdit);
router.post('/edit', userController.updateUser);

module.exports = router;