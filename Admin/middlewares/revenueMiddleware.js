const revenueController = require('../controllers/revenueController');

const getAllRevenue = (req, res, next) => {
    revenueController.getAllRevenue(req, res);
}

module.exports = {
    getAllRevenue
};