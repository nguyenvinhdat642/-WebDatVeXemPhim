const User = require('../models/user');
const getAllUsers = (req, res) => {
    User.getAllUsers(req, res);
}
const addUser = (req, res) => {
    User.addUser(req, res);
}
const deleteUser = (req, res) => {
    User.deleteUser(req, res);
}
const getAllUserEdit = (req, res) => {
    User.getAllUserEdit(req, res);
}
const updateUser = (req, res) => {
    User.updateUser(req, res);
}
module.exports = {
    getAllUsers,
    addUser,
    deleteUser,
    getAllUserEdit,
    updateUser
};