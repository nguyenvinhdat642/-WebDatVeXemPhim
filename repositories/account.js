const dbClient = require('./db_client');
async function addAccount(data){
    const record = await dbClient.query(
        `INSERT INTO KhachHang(MatKhau,HoTen,LoaiKhachHang,MaKhachHang)
        values(?,?,?,?)`,[data.pwd, data.name,'user',data.email]
    );

    return record;
};
async function getAccountByEmail(email) {
    const record = await dbClient.query(
        `SELECT * FROM KhachHang WHERE MaKhachHang = ?`,
        [email]
    );

    return record;
}
async function getAdmin(taikhoan){
    const record = await dbClient.query(
        `SELECT * FROM Admin WHERE TaiKhoan = ?`,
        [taikhoan]
    );

    return record;
}
module.exports = {
    addAccount, getAccountByEmail, getAdmin
}