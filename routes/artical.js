const express = require('express');
const router = express.Router();

const mysql = require('mysql');
let connection

function connectDataBase() {
    //连接数据库数据
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'gu413286',
        database: 'test'
    });
    connection.connect();
}
// 查询文章
router.post('/getArtical', (req, res, next) => {
    //获取数据库数据
    connectDataBase();
    let title = req.body.title;
    let sql=`select content from artical WHERE title="${title}"`;
    console.log(sql)

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            //没找到
            console.log('没找到')
            let response = {code: 201, data:{desc:'noData'}};
            res.send(JSON.stringify(response));
        } else {
            if(result[0]&&result[0].content){
                console.log('找到了')
                let response = {code: 200, data: result};
                res.send(JSON.stringify(response));
            } else{
                let response = {code: 201, data:{desc:'noData'}};
                res.send(JSON.stringify(response));
            }
        }
    });
    connection.end();
})
// 增加文章
router.post('/addArtical', (req, res, next) => {
    connectDataBase();
    let title = req.body.title;
    let artical = req.body.artical;
    let sql = `INSERT INTO artical (title,content) VALUES ("${title}","${artical}")`
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
// 更新文章
router.post('/editArtical', (req, res, next) => {
    connectDataBase();
    let title = req.body.title;
    let artical = req.body.artical;
    let sql = `UPDATE artical SET content="${artical}" WHERE title="${title}"`
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
