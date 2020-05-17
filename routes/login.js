const express = require('express');
const router = express.Router();

const mysql = require('mysql');
let connection

// function connectDataBase() {
//     //连接数据库数据
//     connection = mysql.createConnection({
//         host: '47.114.164.51',
//         user: 'gc',
//         password: 'Gu413286',
//         database: 'blog'
//     });
//     connection.connect();
// }
function connectDataBase() {
    //连接数据库数据
    connection = mysql.createConnection({
        host: 'hdm721887290.my3w.com',
        user: 'hdm721887290',
        password: 'Gu413286',
        database: 'hdm721887290_db'
    });
    connection.connect();
}
//登陆查询
router.post('/login', (req, res, next) => {
    connectDataBase();
    //获取数据库数据
    let account = req.body.account;
    let password = req.body.password;
    let sql=`select account,password from user WHERE account="${account}"`;
    console.log(sql)
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        } else {
            let response={}
            if(result.length>0){
                console.log(result[0].account)
                console.log(result[0].password)
                if(result[0].password&&(result[0].password!=password)){
                    response = {code: 200, data: {desc:'密码错误'}};
                } else{
                    response = {code: 200, data: {desc:'success'}};
                }
            } else{
                response={code:200,data:{desc:'用户不存在'}}
            }
            res.send(JSON.stringify(response));
        }
    });
})

//操作查询
router.post('/operateConfirm', (req, res, next) => {
    connectDataBase();
    //获取数据库数据
    let account = 'root';
    let password = req.body.password;
    console.log(password)
    let sql=`select account,password from user WHERE account="${account}"`;
    console.log(sql)
    connection.query(sql, function (err, result) {
        console.log('?')
        if (err) {
            console.log('这里出错了')
            console.log('[SELECT ERROR] - ', err.message);
            return;
        } else {
            console.log('好烦')
            let response={}
            if(result.length>0){
                if(result[0].password&&(result[0].password!=password)){
                    response = {code: 200, data: {desc:'密码错误'}};
                } else{
                    response = {code: 200, data: {desc:'success'}};
                }
            } else{
                response={code:200,data:{desc:'用户不存在'}}
            }
            res.send(JSON.stringify(response));
        }
    });
})


module.exports = router;
