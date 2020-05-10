const express = require('express');
const router = express.Router();
const moment =require('moment');
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

// 增加
router.post('/addItem', (req, res, next) => {
    connectDataBase();
    console.log('增加代办')
    let content = req.body.content;
    let type = req.body.type;
    let sql = `INSERT INTO todoList (content,type) VALUES ("${content}","${type}")`
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        } else {
            let data = {
                desc: 'success'
            }
            let response = {code: 200, data};
            res.send(JSON.stringify(response));
        }
    });
    connection.end();
})
//查询菜单
router.post('/getItem', (req, res, next) => {
    //获取数据库数据
    console.log('收到请求了')
    connectDataBase();
    console.log('数据库连接正常')
    let type = req.body.type;
    let sql=`select id,content,type,updateTime from todoList WHERE type="${type}"`;
    if(type==2){
        sql='select * from todoList';
    }
    console.log(sql)

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        } else {
            let response = {code: 200, data: result};
            res.send(JSON.stringify(response));
        }
    });
    connection.end();
})
// 更新类型
router.post('/changeType', (req, res, next) => {
    connectDataBase();
    let id = req.body.id;
    let type = req.body.type;
    let sql = `UPDATE todoList SET type="${type=='1'?'0':'1'}" WHERE id="${id}"`
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        } else {
            let data = {
                desc: 'success'
            }
            let response = {code: 200, data};
            res.send(JSON.stringify(response));
        }
    });
    connection.end();
})
//更新内容
router.post('/editItem', (req, res, next) => {
    connectDataBase();
    let id = req.body.id;
    let content = req.body.content;
    let sql = `UPDATE todoList SET content="${content}" WHERE id="${id}"`
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        } else {
            let data = {
                desc: 'success'
            }
            let response = {code: 200, data};
            res.send(JSON.stringify(response));
        }
    });
    connection.end();
})
//删除内容
router.post('/deleteItem', (req, res, next) => {
    connectDataBase();
    let id = req.body.id;
    let sql = `DELETE FROM todoList WHERE id="${id}"`
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        } else {
            let data = {
                desc: 'success'
            }
            let response = {code: 200, data};
            res.send(JSON.stringify(response));
        }
    });
    connection.end();
})
module.exports = router;
