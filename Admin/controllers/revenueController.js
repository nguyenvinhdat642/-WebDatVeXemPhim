const revenue = require('../models/revenue');

const getAllRevenue = (req, res) => {
    revenue.getAllRevenue(req, res);
}

module.exports = {
    getAllRevenue
};