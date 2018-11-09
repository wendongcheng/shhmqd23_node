//  导入并创建Router
const express = require('express')
const path = require('path')

const studentManagerRouter = express.Router()

// 导入studentManagerRouterController
const studentManagerCTRL = require(path.join(__dirname,"../controllers/studentManagerController.js"))

// 获取学生信息列表

studentManagerRouter.get('/list',(req,res)=>{
    studentManagerCTRL.getStudentListPage(req,res)
})

// 获取新增学生信息页面
studentManagerRouter.get('/add',(req,res)=>{
    studentManagerCTRL.getAddStudentPage(req,res)
})

// 新增学生信息
studentManagerRouter.post('/add',(req,res)=>{
    studentManagerCTRL.addStudent(req,res)
})

// 查询学生信息
studentManagerRouter.get('/edit/:studentId',(req,res)=>{
   studentManagerCTRL.getEditStudent(req,res)
})

// 修改学生信息
studentManagerRouter.post('/edit/:studentId',(req,res)=>{
    studentManagerCTRL.editStudent(req,res)
 })

// 删除学生信息
studentManagerRouter.get('/delete/:studentId',(req,res)=>{
    studentManagerCTRL.deleteStudent(req,res)
})

// 3. 导出

module.exports = studentManagerRouter
