//1.创建一个Router
const express = require('express')
const path = require('path')
const accountRouter = express.Router()

//导入账号控制器模块
const accountCTRL = require(path.join(__dirname,"../controllers/accountController.js"))

//2.处理请求
// accountCTRL.getRegistorPage 取出它的值，它的值是一个箭头函数
// accountRouter.get('/register',accountCTRL.getRegistorPage)
// 接收 浏览器获取注册页面的请求
accountRouter.get('/register',(req,res)=>{
    accountCTRL.getRegistorPage(req,res)
})

// 接收 浏览器注册用户的请求
accountRouter.post('/register',(req,res)=>{
    accountCTRL.register(req,res)
})

// 接收 浏览器获取登录页面的请求
accountRouter.get('/login',(req,res)=>{
    accountCTRL.getLoginPage(req,res)
})

// 接收 浏览器获取验证码图片
accountRouter.get('/vcode',(req,res)=>{
    accountCTRL.getVcodeImage(req,res)
})

// 接收 浏览器登录的请求
accountRouter.post('/login',(req,res)=>{
    accountCTRL.login(req,res)
})

// 退出
accountRouter.get('/logout',accountCTRL.logout)

//3.导出模块
module.exports = accountRouter




