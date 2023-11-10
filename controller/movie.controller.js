//Xử lý liên quan đến phim
const express = require('express')
const booking = require('../repositories/movie')
const url = require('url');

//Lấy chi tiết 1 bộ phim (xử lý lấy id từ url)
async function getDetail(req,res){
    const urlString = req.url
    const parsedUrl = url.parse(urlString, true);
    const id = parsedUrl.query.id;

    const movie = await booking.getMovie(id)

    movie[0].Rating = movie[0].Rating.toFixed(1)

    movie[0].NgayKhoiChieu = String((movie[0].NgayKhoiChieu)).substring(0,15)

    if(req.session.user)
        res.render('detail',{layout:"index", "movie":movie[0], "username": (req.session.user).HoTen})
    else 
    res.render('detail',{layout:"indexNotLogin", "movie":movie[0]})
}

//Hiển thị trang chính (lấy tất cả phim từ db)
async function getMain(req,res){
    var movies = await booking.getMovies()
    movies.forEach(element => {
        element.Rating = element.Rating.toFixed(1);
    });
    if(req.session.user)
        res.render('main',{layout:"index", 'data': movies, 'username':req.session.user.HoTen})
    else 
        res.render('main',{layout:"indexNotLogin", 'data': movies})
}

//Hiển thị combo bắp nước
async function getCombo(req,res){
    if(req.session.user)
        res.render('combo',{layout:"index", 'username':req.session.user.HoTen})
    else
        res.render('combo',{layout:"indexNotLogin"})
}

//hiển thị các giao dịch của từng người dùng (lấy id người dùng khi họ đăng nhập thành công)
async function getHistory(req,res){
    if(req.session.user){
        var history = await booking.getHistory(req.session.user.MaKhachHang)
        var ghe = []
        for(i = 0; i<history.length; i++){
            history[i].Ngay =  String((history[i].Ngay)).substring(0,15)
            var soGhe = await booking.getGhe(history[i].MaDatVe)
            var temp = ""
            for(j = 0; j<soGhe.length; j++){
                temp = temp + " " +soGhe[j].TenGhe
            }
            history[i].Ghe = temp
        }
        res.render('history',{layout:"index", 'username':req.session.user.HoTen,'danhsachve':history})
    }
    else 
        res.redirect('/account/login')
}

//Hiển thị các cụm rạp và suất phim
async function getTicket(req,res){
    if(!req.session.user){
        return res.redirect('/account/login')
    }
    const urlString = req.url
    const parsedUrl = url.parse(urlString, true);
    const id = parsedUrl.query.idMovie;
    const name = parsedUrl.query.name;
    if(id != null){
        req.session.idmovie = id;
        const cumrapByIdMovie = await booking.getCumRapByIdMovie(id)
        var tenCumRap = new Set()
        for(i = 0; i < cumrapByIdMovie.length; i++){
            tenCumRap.add(cumrapByIdMovie[i].TenCumRap)
        }
        res.render('booking',{layout:"index", "cumrap": tenCumRap})
    }
    else if(name != null){
        req.session.tenchinhanh = name
        var tenCumRap = new Set()
        var suatphim
        if(req.session.idmovie != null){
            suatphim = await booking.getSuatPhimByMaPhim(name, req.session.idmovie)
            for(i = 0; i < suatphim.length; i++){
                suatphim[i].Ngay = String(suatphim[i].Ngay).slice(15)
                tenCumRap.add(suatphim[i].TenCumRap)
            }
        }
        else{
            suatphim = await booking.getSuatPhimByCumRap(name)
            for(i = 0; i < suatphim.length; i++){
                suatphim[i].Ngay = String(suatphim[i].Ngay).slice(0,15)
                tenCumRap.add(suatphim[i].TenCumRap)
            }  
        }
        res.render('booking',{layout:"index", "suatphim": suatphim, "cumrap": tenCumRap})
    }else{
        const tatcacumrap = await booking.getCumRap()
        var tenCumRap = new Set()
        for(i=0; i<tatcacumrap.length; i++){
            tenCumRap.add(tatcacumrap[i].TenCumRap)
        }
        res.render('booking',{layout:"index", "cumrap": tenCumRap})
    }
}

//Hiển thị các ghế có thể mua
async function getSeats(req,res){
    const urlString = req.url
    const parsedUrl = url.parse(urlString, true);
    var macumrap = parsedUrl.query.macumrap
    var masuatphim = parsedUrl.query.masuatphim
    var nameMovie = await booking.getNameMovie(masuatphim)
    var seat = await booking.getSeats(macumrap, masuatphim)
    var A = [], B = [], C = [], D = [], E = [], F = []
    for(var i = 0; i<=7; i++){
        A[i] = {"name":'A'+(i+1), "status":"seat"}
        B[i] = {"name":'B'+(i+1), "status":"seat"}
        C[i] = {"name":'C'+(i+1), "status":"seat"}
        D[i] = {"name":'D'+(i+1), "status":"seat"}
        E[i] = {"name":'E'+(i+1), "status":"seat"}
        F[i] = {"name":'F'+(i+1), "status":"seat"}
        for(var j=0; j<seat.length; j++){
            var temp = seat[j].TenGhe
            if(A[i].name == temp)
                A[i].status = "seat occupied"
            else if(B[i].name == temp)
                B[i].status = "seat occupied"
            else if(C[i].name == temp)
                C[i].status = "seat occupied"
            else if(D[i].name == temp)
                D[i].status = "seat occupied"
            else if(E[i].name == temp)
                E[i].status = "seat occupied"
            else if(F[i].name == temp)
                F[i].status = "seat occupied"
        }
    }
    req.session.masuatphim = masuatphim
    req.session.tenphim = nameMovie[0].TenPhim
    req.session.rapchieu = nameMovie[0].TenPhongChieu
    req.session.giave = nameMovie[0].Gia
    req.session.gio = nameMovie[0].Gio
    req.session.ngay = nameMovie[0].Ngay
    req.session.poster = nameMovie[0].Poster
    res.render("seat",{layout:"",'A':A, 'B':B, 'C':C, 'D':D, 'E':E, 'F':F, "nameMovie":nameMovie[0]})
}

//Lưu ghế người dùng đã chọn vào session
async function postSeats(req,res){
    req.session.ghe = req.body.seats
    res.redirect('/booking/seats')
}

//Hiển thị thông tin thanh toán
async function getBill(req,res){
    var sove = JSON.parse(req.session.ghe).length
    var tong = req.session.giave * sove + req.session.combo * 79
    if(req.session.user)
        res.render("checkout",{layout:"index", "tenphim":req.session.tenphim, "tenchinhanh":req.session.tenchinhanh, 
            "giochieu":req.session.gio,"ngaychieu":req.session.ngay, "rap":req.session.rapchieu,"sove":sove,
            "giave":req.session.giave,"combo":req.session.combo,"poster":req.session.poster,"tong":tong, "username":req.session.user.HoTen})
    else 
        res.render("checkout",{layout:"indexNotLogin", "tenphim":req.session.tenphim, "tenchinhanh":req.session.tenchinhanh, 
        "giochieu":req.session.gio,"ngaychieu":req.session.ngay, "rap":req.session.rapchieu,"sove":sove,
        "giave":req.session.giave,"combo":req.session.combo,"poster":req.session.poster,"tong":tong})
}

//Xử lý lưu dữ liệu vào db
async function postBill(req,res){
    req.session.combo = (req.body.qtyCombo)
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; 
    const date = now.getDate();
    var timeBooking = `${year}-${month}-${date}`
    var sove = JSON.parse(req.session.ghe).length
    var tong = req.session.giave * sove + req.session.combo * 79
    var soluongve = await booking.countHoaDon()
    var madatve = soluongve[0].soluong + 1
    const resultHoaDon = await booking.addHoaDon(madatve,timeBooking, req.session.masuatphim, req.session.user.MaKhachHang, tong)
    var ghe = JSON.parse(req.session.ghe)
    for(i = 0; i < ghe.length; i++){
        var resultGhe = await booking.addGhe(ghe[i], madatve)
    }
    if(req.body.qtyCombo > 0){
        var resultDichVu = await booking.addKhachHangDichVu(timeBooking, req.session.user.MaKhachHang, 'combo01')
    }
    res.redirect('/booking/bill')
}

//hiển thị phim khi người dùng tìm kiếm
async function getSearch(req,res){
    const urlString = req.url
    const parsedUrl = url.parse(urlString, true);
    const nameMovie = parsedUrl.query.nameMovie;
    var search = await booking.getMovieBySeach(nameMovie)
    for(i=0; i<search.length; i++){
        search[i].Rating = search[i].Rating.toFixed(1)
    }
    if(search.length == 0)
        return res.render("searchMovie",{layout:"index", "notFound":"Không tìm thấy phim"})
    if(req.session.user)
        res.render("searchMovie",{layout:"index", "data":search, "username":req.session.user.HoTen})
    else 
        res.render("searchMovie",{layout:"index", "data":search})
}

//Hiển thị thông tin liên hệ
async function getContact(req,res){
    res.render("contact",{layout:"index"})
}

//Hiển thị về chúng tôi
async function getAbout(req,res){
    res.render("about",{layout:"index"})
}

//Hiển thị phim đang chiếu
async function getMovieShowing(req,res){
    var movies = await booking.getMovies()
    movies.forEach(element => {
        element.Rating = element.Rating.toFixed(1);
    });
    if(req.session.user){
        res.render("searchMovie",{layout:"index", "data":movies, "username":req.session.user.HoTen})
    }
    else 
    res.render("searchMovie",{layout:"index", "data":movies})
}

module.exports = {
    getCombo,getDetail,getHistory,getMain,getSeats,getTicket,
    postSeats,getBill,postBill,getSearch,getContact,getAbout,getMovieShowing
}