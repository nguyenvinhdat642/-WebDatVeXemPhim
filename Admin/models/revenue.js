const db = require('../middlewares/db')

const getAllRevenue = (req, res) => {
    db.query('SELECT * FROM hoadon', (err, result) => {
        if (err) throw err;
        res.render('revenue', { revenue: result });
    });
}

module.exports = {
    getAllRevenue
};