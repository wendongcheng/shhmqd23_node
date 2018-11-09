const path = require("path");
var captchapng = require('captchapng')

const databasetool = require(path.join(__dirname,'../tools/databasetool.js'))


/**
const getRegistorPage = (req,res) => {
    res.send("<h1>欢迎注册</h1>")
}

module.exports = {getRegistorPage:getRegistorPage}
 */

//导出了对象的一个属性，它的值是一个箭头函数
exports.getRegistorPage = (req, res) => {
  // 根据路径去读取文件内容，然后返回给浏览器
  res.sendFile(path.join(__dirname, "../statics/views/registor.html"));
};

/**
 * 暴露了一个对象的属性，它的值是箭头函数
 * 它暴露出去的这个方法就是用来注册用户的
 */
exports.register = (req, res) => {
  const result = { status: 0, message: "注册成功" };

  //1.拿到请求体中的参数【body-parser】
  const params = req.body;


  databasetool.findOne('accountInfo',{username: params.username},(err,doc)=>{

      if(doc !=null){
        result.status = 1;
        result.message = "用户名已经存在"

        res.json(result)
      }else{

        databasetool.insert('accountInfo',params,(err,result2)=>{
           if(result2 == null){

            result.status = 2;
            result.message = "插入失败";
           }

          // 响应给浏览器
          res.json(result)
        })
      }
  })
};

// 导出了对象的一个属性，它的值是一个箭头函数
exports.getLoginPage = (req,res) => {
  // 根据路径去读取文件内容，然后返回给浏览器
  res.sendFile(path.join(__dirname, "../statics/views/login.html"));
}

// 获取验证码图片
exports.getVcodeImage = (req,res) => {
  const vcode = parseInt(Math.random()*9000+1000)

  //保存随机数到session中
  req.session.vcode = vcode
  console.log(req.session.vcode)

  var p = new captchapng(80,30,vcode); // width,height,numeric captcha
  p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

  var img = p.getBase64();
  var imgbase64 = new Buffer(img,'base64');
  res.writeHead(200, {
      'Content-Type': 'image/png'
  });
  res.end(imgbase64);
}

/**
 * 导出登录的方法 login只是导出对象的属性，它的值是箭头函数
 */
exports.login = (req,res) => {
  const result = {status:0,message:'登录成功'}

  //1.获取params
  const params = req.body

  //2.验证验证码
  if(params.vcode != req.session.vcode){
    result.status = 1
    result.message = "验证码错误"
    res.json(result)
    return
  }

  databasetool.findOne('accountInfo',{username:params.username,password:params.password},(err,doc)=>{
     if(doc == null){
        result.status =2;
        result.message = "用户名或者密码错误"
     }else{
       req.session.loginedName = params.username 
     }

     res.json(result)
  })
}

// 退出
exports.logout = (req,res) => {
  req.session.loginedName = null

  res.send("<script>location.href = '/account/login'</script>")
}









