const userController = require('../controllers/userController');

const getAllUsers = (req, res, next) => {
    userController.getAllUsers(req, res);
}

const addUser = (req, res, next) => {
    userController.addUser(req, res);
}

const deleteUser = (req, res, next) => {
    userController.deleteUser(req, res);
}

const getAllUserEdit = (req, res, next) => {
    userController.getAllUserEdit(req, res);
}

const updateUser = (req, res, next) => {
    userController.updateUser(req, res);
}




module.exports = {
    getAllUsers,
    addUser,
    deleteUser,
    getAllUserEdit,
    updateUser
};