const db = require('../middlewares/db')
const getAllPremiere = (req, res) => {
    db.query('SELECT * FROM suatphim ORDER BY MaCumRap', (err, result) => {
        if (err) {
            console.log(err);
        }
        res.render('Premiere', { Premiere: result });
    });
}
const addPremiere = (req, res) => {
    const { MaSuatPhim, Gia, GioiHanDoTuoi, Ngay, Gio, TenPhongChieu, MaPhim, MaCumRap } = req.body;
    console.log(req.body);
    db.query('INSERT INTO suatphim SET ?', { MaSuatPhim: MaSuatPhim, Gia: Gia, GioiHanDoTuoi: GioiHanDoTuoi, Ngay: Ngay, Gio: Gio, TenPhongChieu: TenPhongChieu, MaPhim: MaPhim, MaCumRap: MaCumRap }, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/Premiere');
    });
}

const getAllPremiereEdit = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM suatphim WHERE MaSuatPhim = ?', id, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.render('editPremiere', { premiere: result[0] });
    });
}
const updatePremiere = (req, res) => {
    const id = req.params.id;
    const { MaSuatPhim, Gia, GioiHanDoTuoi, Ngay, Gio, TenPhongChieu, MaPhim, MaCumRap } = req.body;
    console.log(req.body);
    db.query('UPDATE suatphim SET Gia = ?, GioiHanDoTuoi = ?, Ngay = ?, Gio = ?, TenPhongChieu = ?, MaPhim = ?, MaCumRap = ? WHERE MaSuatPhim = ?', [MaSuatPhim, Gia, GioiHanDoTuoi, Ngay, Gio, TenPhongChieu, MaPhim, MaCumRap], (err, result) => {
        if (err) {
            console.log(result);
            console.log(err);
        }
        res.redirect('/Premiere');
    });
}
module.exports = {
    getAllPremiere,
    addPremiere,
    getAllPremiereEdit,
    updatePremiere
};