const express = require('express');
const {check} = require('express-validator')
const account = require('../../controller/account.controller')
const router = express.Router();

//kiểm tra input từ đang
const loginValidator = [
    check("email").exists().withMessage("Vui long nhap email nguoi dung")
    .notEmpty().withMessage("Khong duoc de trong email nguoi dung"),
    check("pwd").exists().withMessage("Vui long nhap mat khau nguoi dung")
    .notEmpty().withMessage("Khong duoc de trong mat khau nguoi dung")
    .isLength({min:6}).withMessage("Mat khau phai it nhat 6 ky tu")
]

const validator = [
    check('name').exists().withMessage("Vui long nhap ten nguoi dung")
    .notEmpty().withMessage("Khong duoc de trong ten nguoi dung"),
    check("email").exists().withMessage("Vui long nhap email nguoi dung")
    .notEmpty().withMessage("Khong duoc de trong email nguoi dung")
    .isEmail().withMessage("Khong phai email hop le"),
    check("pwd").exists().withMessage("Vui long nhap mat khau nguoi dung")
    .notEmpty().withMessage("Khong duoc de trong mat khau nguoi dung")
    .isLength({min:6}).withMessage("Mat khau phai it nhat 6 ky tu"),
]
router.post('/login', loginValidator ,account.postLogin)
router.post('/register', validator, account.postRegister)
router.get('/login', account.getLogin)
router.get('/register', account.getRegister)
router.get('/logout', account.logout)
module.exports = router