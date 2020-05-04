//mysql连接池配置文件
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gu413286',
    database: 'test'
});

connection.connect();
let tempObj={}
tempObj.find=()=>{
    connection.query('select * from websites',function (err, result) {
        console.log('开始查询')
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        console.log(result);
    })
}
connection.end();
console.log('引入依赖的时候会执行这个文件？')

module.expotrs=  {tempObj};
