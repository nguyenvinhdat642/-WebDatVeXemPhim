const dbClient = require('./db_client');

async function getSeats(macumrap, masuatphim) {
    const record = await dbClient.query(
        `SELECT TenGhe FROM suatphim s, hoadon h, ghe g where s.MaSuatPhim = h.MaSuatPhim and h.MaDatVe = g.MaDatVe and s.MaCumRap = ? and s.MaSuatPhim = ?;`,
        [macumrap, masuatphim]
    );

    return record;
};

async function getNameMovie(masuatphim){
    const record = await dbClient.query(
        `SELECT TenPhim,Gia,TenPhongChieu,Gio,Ngay,Poster FROM phim p, suatphim s where p.MaPhim = s.MaPhim and s.MaSuatPhim = ?;`,
        [masuatphim]
    )
    return record;
};

async function getMovies(){
    const record = await dbClient.query(
        `SELECT * FROM phim`
    )
    return record;
};

async function getMovie(maPhim){
    const record = await dbClient.query(
        `SELECT * FROM phim where MaPhim = ?;`, [maPhim]
    )
    return record;
};

async function getCumRap(){
    const record = await dbClient.query(
        `SELECT * FROM cumrap`
    )
    return record;
};

async function getCumRapByIdMovie( maPhim){
    const record = await dbClient.query(
        `SELECT MaPhim, MaSuatPhim, Ngay, Gio, TenPhongChieu, c.MaCumRap, TenCumRap FROM suatphim s, cumrap c 
        where s.MaCumRap = c.MaCuMRap and s.MaPhim = ?
        `, [maPhim]
    )
    return record;
};

async function getSuatPhimByCumRap(tenCumRap){
    const record = await dbClient.query(
        `SELECT MaSuatPhim, TenPhim, Ngay, Gio, TenPhongChieu, TenCumRap, Gia, c.MaCumRap FROM phim p,suatphim s, cumrap c 
        where p.MaPhim = s.MaPhim and s.MaCumRap = c.MaCumRap and c.TenCumRap = ?
        `, [tenCumRap]
    )
    return record;
};

async function getSuatPhimByMaPhim(tenCumRap, maPhim){
    const record = await dbClient.query(
        `SELECT MaSuatPhim, TenPhim, Ngay, Gio, TenPhongChieu, TenCumRap, Gia, c.MaCumRap FROM phim p, suatphim s, cumrap c 
        where p.MaPhim = s.MaPhim and s.MaCumRap = c.MaCumRap and c.TenCumRap = ? and s.MaPhim = ?
        `, [tenCumRap,maPhim]
    )
    return record;
};

async function addHoaDon(madatve,thoigian, masuatphim, makhachhang, tongtien){
    const record = await dbClient.query(
        `INSERT INTO hoadon (MaDatVe,ThoiGian,MaSuatPhim, MaKhachHang, TongTien)
        values(?,?,?,?,?)`,[madatve,thoigian, masuatphim, makhachhang, tongtien]
    );

    return record;
}

async function addGhe(tenghe, madatve){
    const record = await dbClient.query(
        `INSERT INTO ghe (TenGhe,MaDatVe)
        values(?,?)`,[tenghe, madatve]
    );

    return record;
}

async function addKhachHangDichVu(ngaydat,makhachhang,madichvu){
    const record = await dbClient.query(
        `INSERT INTO khachhang_dichvu (NgayDat,MakhachHang,MaDichVu)
        values(?,?,?)`,[ngaydat, makhachhang, madichvu]
    );

    return record;
}

async function countHoaDon(){
    const record = await dbClient.query(
        `SELECT COUNT(MaDatVe) as soluong from hoadon`
    );

    return record;
}

async function getHistory(makhachhang){
    const record = await dbClient.query(
        `SELECT MaDatVe,TenPhim, TenPhongChieu, Gio, TenCumRap,Ngay FROM hoadon h, suatphim s, phim p, cumrap c where h.MaSuatPhim = s.MaSuatPhim and s.MaPhim = p.MaPhim and c.MaCumRap = s.MaCumRap
        and h.MaKhachHang = ?`,
        [makhachhang]
    );

    return record;
}

async function getGhe(madatve){
    const record = await dbClient.query(
        `SELECT TenGhe from hoadon h, ghe g where h.MaDatVe = g.MaDatVe and h.MaDatVe = ?`,
        [madatve]
    );

    return record;
}

async function getMovieBySeach(key){
    const record = await dbClient.query(
        `SELECT * from phim where TenPhim like '%` + key + `%'`,
    );
    return record;
}   
module.exports = {
    getSeats, getNameMovie, getMovies, getMovie, getCumRap, getCumRapByIdMovie, getSuatPhimByMaPhim,
    getSuatPhimByCumRap, addHoaDon,addGhe, addKhachHangDichVu,countHoaDon,getHistory, getGhe,getMovieBySeach
}