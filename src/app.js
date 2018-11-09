// 1. 导入

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

// 2. 创建app 
const app = express()
// 设置全局的模版引擎为 express-art-template
app.engine('html', require('express-art-template'));

// 3. 集成session中间件
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true
    })
)


// 4. 集成body-parser的中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// 5.集成静态资源中间件
app.use(express.static(path.join(__dirname,"statics")))


// 使用app.all()方法拦截所有发送的请求
app.all('/*',(req,res,next)=>{
    if(req.url.includes('account')){
        next()
    }else{
        if(req.session.loginedName){
            next()
        }else{
            res.send("<script>alert('您还没有登录，请先登录!');location.href='/account/login'</script>")
        }
    }
})

// 6. 集成路由中间件
const accountRouter = require(path.join(__dirname,"routers/accountRouter.js"))
app.use('/account',accountRouter)


// 
const studentManagerRouter = require(path.join(__dirname,"routers/studentManagerRouter.js"))
app.use('/studentmanager',studentManagerRouter)

// 7. 开启服务

app.listen(3000,'127.0.0.1',err=>{
    
    console.log('start OK')

})




