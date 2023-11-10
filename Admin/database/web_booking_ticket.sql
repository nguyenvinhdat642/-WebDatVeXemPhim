-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2023 at 10:23 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web_booking_ticket`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `MatKhau` varchar(255) NOT NULL,
  `TaiKhoan` varchar(30) NOT NULL,
  `MaAdmin` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cumrap`
--

CREATE TABLE `cumrap` (
  `MaCumRap` varchar(20) NOT NULL,
  `TenCumRap` varchar(30) NOT NULL,
  `KhuVuc` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cumrap`
--

INSERT INTO `cumrap` (`MaCumRap`, `TenCumRap`, `KhuVuc`) VALUES
('cinema07', 'Cinema Q7', 'TPHCM');

-- --------------------------------------------------------

--
-- Table structure for table `danhgiaphim`
--

CREATE TABLE `danhgiaphim` (
  `MaDanhGia` int(11) NOT NULL,
  `NoiDung` varchar(100) NOT NULL,
  `vote` float NOT NULL,
  `MaKhachHang` varchar(10) NOT NULL,
  `Mã_phim` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `dichvu`
--

CREATE TABLE `dichvu` (
  `MaDichVu` varchar(20) NOT NULL,
  `Combo` varchar(30) NOT NULL,
  `GiaTien` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dichvu`
--

INSERT INTO `dichvu` (`MaDichVu`, `Combo`, `GiaTien`) VALUES
('combo01', 'Combo bap nuoc 79k', 79),
('combo02', 'Combo 2 nuoc 1 bap', 129);

-- --------------------------------------------------------

--
-- Table structure for table `ghe`
--

CREATE TABLE `ghe` (
  `TenGhe` varchar(5) NOT NULL,
  `id` int(11) NOT NULL,
  `MaDatVe` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ghe`
--

INSERT INTO `ghe` (`TenGhe`, `id`, `MaDatVe`) VALUES
('A1', 1, 'HD01'),
('A2', 2, 'HD01');

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--

CREATE TABLE `hoadon` (
  `MaDatVe` varchar(20) NOT NULL,
  `ThoiGian` date NOT NULL,
  `MaSuatPhim` varchar(20) NOT NULL,
  `MaKhachHang` varchar(10) NOT NULL,
  `TongTien` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hoadon`
--

INSERT INTO `hoadon` (`MaDatVe`, `ThoiGian`, `MaSuatPhim`, `MaKhachHang`, `TongTien`) VALUES
('HD01', '2023-04-20', 'mario01', 'KH01', 170);

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

CREATE TABLE `khachhang` (
  `MatKhau` varchar(255) NOT NULL,
  `HoTen` varchar(50) NOT NULL,
  `LoaiKhachHang` varchar(10) NOT NULL,
  `MaKhachHang` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`MatKhau`, `HoTen`, `LoaiKhachHang`, `MaKhachHang`) VALUES
('123456', 'truong thanh loi', 'user', 'KH01'),
('123456', 'hong son', 'user', 'KH02');

-- --------------------------------------------------------

--
-- Table structure for table `khachhang_dichvu`
--

CREATE TABLE `khachhang_dichvu` (
  `NgayDat` date NOT NULL,
  `MaKhachHang` varchar(10) NOT NULL,
  `MaDichVu` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `phim`
--

CREATE TABLE `phim` (
  `MaPhim` varchar(20) NOT NULL,
  `TenPhim` varchar(30) NOT NULL,
  `ThoiLuong` int(11) NOT NULL,
  `TomTat` varchar(100) NOT NULL,
  `DinhDang` char(5) NOT NULL,
  `Trailer` varchar(200) NOT NULL,
  `Poster` varchar(200) NOT NULL,
  `Rating` float NOT NULL,
  `NgayKhoiChieu` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `phim`
--

INSERT INTO `phim` (`MaPhim`, `TenPhim`, `ThoiLuong`, `TomTat`, `DinhDang`, `Trailer`, `Poster`, `Rating`, `NgayKhoiChieu`) VALUES
('1033219', 'Attack on Titan', 93, '', '2D', 'https://www.youtube.com/embed/vdpj3SQpKcw', 'https://image.tmdb.org/t/p/w500/eNJhWy7xFzR74SYaSJHqJZuroDm.jpg', 6.1, '2022-09-30'),
('315162', 'Puss in Boots: The Last Wish', 103, 'Puss phát hiện ra rằng niềm đam mê phiêu lưu mạo hiểm của anh đã gây ra hậu quả: Anh đã đốt cháy 8 t', '2D', 'https://www.youtube.com/embed/z-E5pTQVW8w', 'https://image.tmdb.org/t/p/w500/ouB7hwclG7QI3INoYJHaZL4vOaa.jpg', 8.3, '2022-12-07'),
('502356', 'The Super Mario Bros. Movie', 92, 'Câu chuyện về cuộc phiêu lưu của anh em Super Mario đến vương quốc Nấm.', '2D', 'https://www.youtube.com/embed/LTFGH0rJ-EY', 'https://image.tmdb.org/t/p/w500/lWqjXgut48IK5f5IRbDBAoO2Epp.jpg', 7.5, '2023-04-05'),
('594767', 'Shazam! Fury of the Gods', 130, 'Bộ phim tiếp tục câu chuyện về cậu thiếu niên Billy Batson, khi đọc thuộc lòng từ ma thuật \"SHAZAM!\"', '2D', 'https://www.youtube.com/embed/gardMnJszqc', 'https://image.tmdb.org/t/p/w500/wybmSmviUXxlBmX44gtpow5Y9TB.jpg', 6.9, '2023-03-15'),
('603692', 'John Wick: Chapter 4', 170, 'Sát Thủ John Wick: Chương 4 là câu chuyện của John Wick (Keanu Reeves) đã khám phá ra con đường để đ', '2D', 'https://www.youtube.com/embed/vBwj0QpKbSM', 'https://image.tmdb.org/t/p/w500/h8gHn0OzBoaefsYseUByqsmEDMY.jpg', 8, '2023-03-22'),
('638974', 'Murder Mystery 2', 91, 'Sau khi mở công ty thám tử riêng, Nick và Audrey Spitz có được một vụ án giúp sự nghiệp lên hương kh', '2D', 'https://www.youtube.com/embed/jeVNn7-FQ64', 'https://image.tmdb.org/t/p/w500/bT3IpP7OopgiVuy6HCPOWLuaFAd.jpg', 6.6, '2023-03-28'),
('640146', 'Ant-Man and the Wasp: Quantuma', 125, 'Scott Lang và Hope Van Dyne trở lại tiếp tục cuộc phiêu lưu của họ với vai trò Người Kiến và Chiến b', '2D', 'https://www.youtube.com/embed/ThseAPVAtMQ', 'https://image.tmdb.org/t/p/w500/xCa7gIEAIy66S2LSaME90QJEWHm.jpg', 6.4, '2023-02-15'),
('677179', 'Creed III', 116, 'Tay đấm lừng danh Adonis Creed, khi gặp gỡ một người bạn cũ, nhưng cũng đồng thời là đối thủ mới của', '2D', 'https://www.youtube.com/embed/qphf_-PPaaI', 'https://image.tmdb.org/t/p/w500/5i6SjyDbDWqyun8klUuCxrlFbyw.jpg', 7.3, '2023-03-01'),
('700391', '65', 93, 'Sau cú va chạm thảm khốc, tàu vũ trụ của Mills (Adam Driver) bay thẳng đến một hành tinh không xác đ', '2D', 'https://www.youtube.com/embed/2kgJuEX4yhc', 'https://image.tmdb.org/t/p/w500/eSVu1FvGPy86TDo4hQbpuHx55DJ.jpg', 6.4, '2023-03-02'),
('736790', 'Chupa', 95, '', '2D', 'https://www.youtube.com/embed/bJ4ENBghzSs', 'https://image.tmdb.org/t/p/w500/aityu1Gma509jInlspHstEt8Jg0.jpg', 6.5, '2023-04-07'),
('758323', 'The Pope\'s Exorcist', 103, 'Lấy cảm hứng từ những hồ sơ có thật của Cha Gabriele Amorth, Trưởng Trừ Tà của Vatican (Russell Crow', '2D', 'https://www.youtube.com/embed/vGvpw1LS4EE', 'https://image.tmdb.org/t/p/w500/5Y5pz0NX7SZS9036I733F7uNcwK.jpg', 6.6, '2023-04-05'),
('76600', 'Avatar: The Way of Water', 192, 'Câu chuyện của “Avatar: Dòng Chảy Của Nước” lấy bối cảnh 10 năm sau những sự kiện xảy ra ở phần đầu ', '2D', 'https://www.youtube.com/embed/Sw9hdSjzZjc', 'https://image.tmdb.org/t/p/w500/ovM06PdF3M8wvKb06i4sjW3xoww.jpg', 7.7, '2022-12-14'),
('804150', 'Cocaine Bear', 96, 'Trong một khu rừng ở Georgia, một con gấu đen Mỹ bất ngờ ăn phải lượng lớn chất kích thích bị rơi từ', '2D', 'https://www.youtube.com/embed/Ejl2dv61O04', 'https://image.tmdb.org/t/p/w500/a2tys4sD7xzVaogPntGsT1ypVoT.jpg', 6.4, '2023-02-22'),
('816904', 'Momias', 88, 'Sâu dưới lòng đất, một vương quốc xác ướp với lịch sử cả ngàn năm đang rất thịnh vượng. Theo thông l', '2D', 'https://www.youtube.com/embed/EMzKsL2ckfY', 'https://image.tmdb.org/t/p/w500/c3hl9E8E7b9opXDFVF5tSyk0ykr.jpg', 7.1, '2023-01-05'),
('842945', 'Supercell', 100, '', '2D', 'https://www.youtube.com/embed/Te4pM0uzYIc', 'https://image.tmdb.org/t/p/w500/m1fgGSLK0WvRpzM1AmZu38m0Tx8.jpg', 6.1, '2023-03-17'),
('849869', '길복순', 137, 'Trong công việc, cô là sát thủ khét tiếng. Ở nhà, cô là mẹ đơn thân của một cô con gái tuổi teen. Gi', '2D', 'https://www.youtube.com/embed/6w2vM69JxpM', 'https://image.tmdb.org/t/p/w500/tYcmm8XtzRdcT6kliCbHuWwLCwB.jpg', 6.8, '2023-02-17');

-- --------------------------------------------------------

--
-- Table structure for table `suatphim`
--

CREATE TABLE `suatphim` (
  `MaSuatPhim` varchar(20) NOT NULL,
  `Gia` float NOT NULL,
  `GioiHanDoTuoi` int(11) NOT NULL,
  `Ngay` date NOT NULL,
  `Gio` varchar(6) NOT NULL,
  `TenPhongChieu` varchar(20) NOT NULL,
  `MaPhim` varchar(20) NOT NULL,
  `MaCumRap` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `suatphim`
--

INSERT INTO `suatphim` (`MaSuatPhim`, `Gia`, `GioiHanDoTuoi`, `Ngay`, `Gio`, `TenPhongChieu`, `MaPhim`, `MaCumRap`) VALUES
('mario01', 70, 12, '2023-04-20', '13:30', 'Rap 1', '502356', 'cinema07'),
('mario02', 90, 12, '2023-04-20', '19:00', 'Rap 2', '502356', 'cinema07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`MaAdmin`);

--
-- Indexes for table `cumrap`
--
ALTER TABLE `cumrap`
  ADD PRIMARY KEY (`MaCumRap`);

--
-- Indexes for table `danhgiaphim`
--
ALTER TABLE `danhgiaphim`
  ADD PRIMARY KEY (`MaDanhGia`),
  ADD UNIQUE KEY `MaKhachHang` (`MaKhachHang`,`Mã_phim`),
  ADD KEY `Mã_phim` (`Mã_phim`);

--
-- Indexes for table `dichvu`
--
ALTER TABLE `dichvu`
  ADD PRIMARY KEY (`MaDichVu`);

--
-- Indexes for table `ghe`
--
ALTER TABLE `ghe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `MaDatVe` (`MaDatVe`);

--
-- Indexes for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`MaDatVe`),
  ADD KEY `MaSuatPhim` (`MaSuatPhim`),
  ADD KEY `MaKhachHang` (`MaKhachHang`);

--
-- Indexes for table `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`MaKhachHang`);

--
-- Indexes for table `khachhang_dichvu`
--
ALTER TABLE `khachhang_dichvu`
  ADD PRIMARY KEY (`MaKhachHang`,`MaDichVu`),
  ADD KEY `MaDichVu` (`MaDichVu`);

--
-- Indexes for table `phim`
--
ALTER TABLE `phim`
  ADD PRIMARY KEY (`MaPhim`);

--
-- Indexes for table `suatphim`
--
ALTER TABLE `suatphim`
  ADD PRIMARY KEY (`MaSuatPhim`),
  ADD KEY `MaPhim` (`MaPhim`),
  ADD KEY `MaCumRap` (`MaCumRap`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ghe`
--
ALTER TABLE `ghe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `danhgiaphim`
--
ALTER TABLE `danhgiaphim`
  ADD CONSTRAINT `danhgiaphim_ibfk_1` FOREIGN KEY (`MaKhachHang`) REFERENCES `khachhang` (`MaKhachHang`),
  ADD CONSTRAINT `danhgiaphim_ibfk_2` FOREIGN KEY (`Mã_phim`) REFERENCES `phim` (`MaPhim`);

--
-- Constraints for table `ghe`
--
ALTER TABLE `ghe`
  ADD CONSTRAINT `ghe_ibfk_1` FOREIGN KEY (`MaDatVe`) REFERENCES `hoadon` (`MaDatVe`);

--
-- Constraints for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`MaSuatPhim`) REFERENCES `suatphim` (`MaSuatPhim`),
  ADD CONSTRAINT `hoadon_ibfk_2` FOREIGN KEY (`MaKhachHang`) REFERENCES `khachhang` (`MaKhachHang`);

--
-- Constraints for table `khachhang_dichvu`
--
ALTER TABLE `khachhang_dichvu`
  ADD CONSTRAINT `khachhang_dichvu_ibfk_1` FOREIGN KEY (`MaKhachHang`) REFERENCES `khachhang` (`MaKhachHang`),
  ADD CONSTRAINT `khachhang_dichvu_ibfk_2` FOREIGN KEY (`MaDichVu`) REFERENCES `dichvu` (`MaDichVu`);

--
-- Constraints for table `suatphim`
--
ALTER TABLE `suatphim`
  ADD CONSTRAINT `suatphim_ibfk_1` FOREIGN KEY (`MaPhim`) REFERENCES `phim` (`MaPhim`),
  ADD CONSTRAINT `suatphim_ibfk_2` FOREIGN KEY (`MaCumRap`) REFERENCES `cumrap` (`MaCumRap`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
