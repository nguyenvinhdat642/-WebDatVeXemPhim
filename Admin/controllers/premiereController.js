const premiere = require('../models/premiere');
const getAllPremiere = (req, res) => {
    premiere.getAllPremiere(req, res);
}
const addPremiere = (req, res) => {
    premiere.addPremiere(req, res);
}

const addPremierePage = (req, res) => {
    res.render('addPremiere');
};


const getAllPremiereEdit = (req, res) => {
    premiere.getAllPremiereEdit(req, res);
}
const updatePremiere = (req, res) => {
    premiere.updatePremiere(req, res);
}
module.exports = {
    getAllPremiere,
    addPremiere,
    addPremierePage,
    getAllPremiereEdit,
    updatePremiere
};