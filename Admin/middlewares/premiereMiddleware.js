const premiereController = require('../controllers/premiereController');
const getAllPremiere = (req, res, next) => {
    premiereController.getAllPremiere(req, res);
}
const addPremiere = (req, res, next) => {
    premiereController.addPremiere(req, res);
}

const addPremierePage = (req, res, next) => {
    premiereController.addPremierePage(req, res);
};

const getAllPremiereEdit = (req, res, next) => {
    premiereController.getAllPremiereEdit(req, res);
}
const updatePremiere = (req, res, next) => {
    premiereController.updatePremiere(req, res);
}
module.exports = {
    getAllPremiere,
    addPremiere,
    addPremierePage,
    getAllPremiereEdit,
    updatePremiere
};