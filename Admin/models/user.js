const db = require('../middlewares/db');

const getAllUsers = (req, res) => {
    db.query('SELECT * FROM khachhang', (err, result) => {
        if (err) throw err;
        res.render('user', { user: result });
    });
}


const addUser = (req, res) => {
    const { MatKhau, HoTen, LoaiKhachHang, MaKhachHang } = req.body;
    db.query('INSERT INTO khachhang SET ?', { MatKhau: MatKhau, HoTen: HoTen, LoaiKhachHang: LoaiKhachHang, MaKhachHang: MaKhachHang }, (err, result) => {
        if (err) throw err;
        res.redirect('/user');
    });
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM khachhang WHERE MaKhachHang = ?', id, (err, result) => {
        if (err) throw err;
        res.redirect('/user');
    });
}

const getAllUserEdit = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM khachhang WHERE MaKhachHang = ?', id, (err, result) => {
        if (err) throw err;
        res.render('editUser', { user: result[0] });
    });
}

const updateUser = (req, res) => {
    const id = req.params.id;
    const { HoTen, LoaiKhachHang, MaKhachHang } = req.body;
    db.query('UPDATE khachhang SET HoTen = ?, LoaiKhachHang = ? WHERE MaKhachHang = ?', [HoTen, LoaiKhachHang, MaKhachHang], (err, result) => {
        if (err) throw err;
        res.redirect('/user');
    });
}

module.exports = {
    getAllUsers,
    addUser,
    deleteUser,
    getAllUserEdit,
    updateUser
};