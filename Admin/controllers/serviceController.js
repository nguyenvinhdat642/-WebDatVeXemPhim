const Service = require('../models/service');
const getAllServices = (req, res) => {
    Service.getAllServices(req, res);
}
const addService = (req, res) => {
    Service.addService(req, res);
}

const deleteService = (req, res) => {
    Service.deleteService(req, res);
}
const getAllServiceEdit = (req, res) => {
    Service.getAllServiceEdit(req, res);
}
const updateService = (req, res) => {
    Service.updateService(req, res);
}
module.exports = {
    getAllServices,
    addService,
    deleteService,
    getAllServiceEdit,
    updateService
};