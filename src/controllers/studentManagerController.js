const MongoClient = require('mongodb').MongoClient;
const path = require('path')


const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'szhmqd23';


// 获取学生列表页面

const databasetool = require(path.join(__dirname,"../tools/databasetool.js"))

    // 2. 获取学生列表页面
    const getStudentListPage = (req,res) =>{
        const keyword = req.query.keyword || ''
        
        // 2.1 传入三个参数
        databasetool.findList('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
            
             // 使用真实数据渲染页面
             res.render(path.join(__dirname,"../statics/views/list.html"),{students: docs,keyword,loginedName:req.session.loginedName});
        })
    }

// 定义一个获取新增页面的方法
const getAddStudentPage = (req,res) => {
    res.render(path.join(__dirname,"../statics/views/add.html"), {loginedName:req.session.loginedName});
}

// 新增学生信息
const addStudent = (req,res) => {
    //1.去数据库中查询数据
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
        //1. 获取db对象 szhmqd23
        const db = client.db(dbName);

        //2. 获取集合
        const collection = db.collection('studentInfo')

        //3. 新增
        collection.insertOne(req.body,(err,result)=>{
            client.close();
            if(result == null){//插入失败
                res.send("<script>alert('插入失败');</script>")
            }else{
                res.send("<script>window.location.href='/studentmanager/list'</script>")
            }
        })
    })
}


const getEditStudent = (req,res) =>{

   const studentId = databasetool.ObjectId(req.params.studentId)
   databasetool.findOne('studentInfo',{_id:studentId},(err,doc)=>{

       res.render(path.join(__dirname,"../statics/views/edit.html"),{
            studentInfo: doc,
            loginedName:req.session.loginedName
       })
       
   })
}

const editStudent = (req,res) =>{
     const studentId = databasetool.ObjectId(req.params.studentId)

     databasetool.updateOne('studentInfo',{_id:studentId},req.body,(err,result)=>{
        if(result == null){//修改失败
            res.send("<script>alert('修改失败');</script>")
        } else {
            res.send("<script>location.href='/studentmanager/list'</script>")
        }
     })
}

const deleteStudent = (req,res) =>{
     const studentId = databasetool.ObjectId(req.params.studentId)

     databasetool.deleteOne('studentInfo',{_id:studentId},(err,result)=>{
         if(result == null){ //删除失败
             res.send("<script>alert('删除失败');</script>")
         }else{
             res.send("<script>location.href='/studentmanager/list'</script>")
         }
     })
}


module.exports ={
    getStudentListPage,
    getAddStudentPage,
    addStudent,
    getEditStudent,
    editStudent,
    deleteStudent

} 

