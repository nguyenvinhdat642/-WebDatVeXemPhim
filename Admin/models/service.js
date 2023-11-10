const db = require('../middlewares/db')
const getAllServices = (req, res) => {
    db.query('SELECT * FROM dichvu', (err, result) => {
        if (err) {
            console.log(err);
        }
        res.render('Service', { service: result });
    });
}
const addService = (req, res) => {
    const { MaDichVu, Combo, GiaTien } = req.body;
    db.query('INSERT INTO dichvu SET ?', { MaDichVu: MaDichVu, Combo: Combo, GiaTien: GiaTien }, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/service');
    });
}
const deleteService = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM dichvu WHERE MaDichVu = ?', id, (err, result) => {
        console.log(result);
        if (err) {
            console.log(err);
        }
        res.redirect('/service');
    });
}
const getAllServiceEdit = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM dichvu WHERE MaDichVu = ?', id, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.render('editService', { service: result[0] });
    });
}
const updateService = (req, res) => {
    const id = req.params.id;
    const { MaDichVu, Combo, GiaTien } = req.body;
    console
    db.query('UPDATE dichvu SET Combo = ?, GiaTien = ? WHERE MaDichVu = ?', [Combo, GiaTien, MaDichVu], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/service');
    });
}
module.exports = {
    getAllServices,
    addService,
    deleteService,
    getAllServiceEdit,
    updateService
};