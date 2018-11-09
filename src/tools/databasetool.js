const MongoClient = require('mongodb').MongoClient;

const ObjectId = require('mongodb').ObjectId
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'szhmqd23';


// 查询操作
const getCollection = (collectionName,callback)=>{
    MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function(err,client){
            const db = client.db(dbName);
 
         //  拿到需要操作的集合
         const collection = db.collection(collectionName)
 
         // 把collection对象传递给调用者
         callback(collection,client)
        }
    );
}

const findList = (collectionName,params,callback)=>{
//    MongoClient.connect(
//        url,
//        { useNewUrlParser: true },
//        function(err,client){
//            const db = client.db(dbName);

//         //  拿到需要操作的集合
//         const collection = db.collection(collectionName)

//         // 调用collection的方法
//         collection.find(params).toArray((err,docs)=>{
//             client.close();
//             callback(err,docs)
//         })
//        }
//    );

   getCollection(collectionName,(collection,client)=>{

       collection.find(params).toArray((err,docs)=>{
           client.close()

          // 回调函数
          callback(err,docs);
       })
   })
};

const findOne = (collectionName,params,callback)=>{
    getCollection(collectionName,(collection,client)=>{
        collection.findOne(params,(err,doc)=>{
            client.close();

            callback(err,doc);
    });
  });
}


const insert = (collectionName,params,callback)=>{
    getCollection(collectionName,(collection,client)=>{
         collection.insertOne(params,(err,result)=>{
             client.close();

             callback(err,result);
     });
   });
};


// 调用更改的方法
const updateOne = (collectionName,condition,params,callback)=>{
    getCollection(collectionName,(collection,client)=>{
        collection.updateOne(condition,{$set:params},(err,result)=>{
        //关闭数据库连接
        client.close();

        // 调用callback 把结果返回给控制器
        callback(err,result)
      })
    })
}


// 修改页面

const deleteOne = (collectionName,params,callback)=>{
    getCollection(collectionName,(collection,client)=>{
        collection.deleteOne(params,(err,result)=>{
            client.close();

            callback(err,result);
        })
    })
}

module.exports = {ObjectId,findList,insert,findOne,updateOne,deleteOne};