//Xử lý cho phía tài khoản
const express = require('express')
const {validationResult} = require('express-validator')
const account = require('../repositories/account')
const bcrypt = require('bcrypt')

//hiển thị trang đăng nhập
async function getLogin(req,res){
    res.render('login',{layout:'index'})
}

//hiển thị trang đăng ký
async function getRegister(req,res){
    res.render('register',{layout:'index'})
}

//xử lý login từ client
async function postLogin(req,res){
    var result = validationResult(req)
    if(result.errors.length == 0){
      const {email, pwd} = req.body
      if(email.includes('admin')){
            const admin = await account.getAdmin(email)
            if(admin[0].MatKhau == pwd){
                req.session.admin = admin[0]
                return res.redirect('/Admin')
             }
      }else{
        const resultFromDB = await account.getAccountByEmail(email)
        const hashed = resultFromDB[0].MatKhau
        const match =  bcrypt.compareSync(pwd, hashed)
        if(match){
            let user = resultFromDB[0]
            req.session.user=user
            return res.redirect("/booking/ticket")
        }
        else if(resultFromDB.length == 0){
            req.session.flash = {
                error:"email khong ton tai"
            }
            return res.redirect("/account/login")
        }else{
            req.session.flash = {
                email:email,
                error:"Sai mat khau"
            }
            return res.redirect("/account/login")
        }
    }
    }
    result = result.mapped()
    var message
    for(fields in result){
        message = result[fields].msg
        break;
    }
    req.session.flash = {
        name:req.body.pwd,
        email:req.body.email,
        error:message
    }
    res.redirect("/account/login")
}

//xử lý đăng ký từ client
async function postRegister(req,res){
    var result = validationResult(req)
    if(result.errors.length === 0){
        let data = req.body
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.pwd, salt);
        data.pwd = hash
        const resultFromService = await account.addAccount(data)
        if(resultFromService.affectedRows === 1){
            return res.redirect("/account/login")
        }
        else{
            req.session.flash = {
                error:"Dang ky khong thanh cong!"
            }
            return res.redirect("/account/register")
        }
    }else{
        result = result.mapped()
        var message
        for(fields in result){
            message = result[fields].msg
            break;
        }
        req.session.flash = {
            name:req.body.name,
            email:req.body.email,
            error:message
        }
        res.redirect("/account/register")
    }
}

//Xử lý đăng xuất
async function logout(req, res){
    req.session.destroy()
    res.redirect("/booking")
}
module.exports = {
    getLogin, getRegister,postLogin, postRegister,logout
}