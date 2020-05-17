const express = require('express');
const router = express.Router();

const mysql = require('mysql');
let connection

// function connectDataBase() {
//     //连接数据库数据
//     connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'gu413286',
//         database: 'test'
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

// 查询博客列表
router.post('/getBlogList', (req, res, next) => {
    //获取数据库数据
    connectDataBase();
    let title = req.body.title;
    // let sql=`select content from artical WHERE title="${title}"`;
    let sql = `select * from blog order by cast(updateTime as datetime) desc`;
    console.log(sql)
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            //没找到
            console.log('没找到')
            let response = {code: 201, data: {desc: 'noData'}};
            res.send(JSON.stringify(response));
        } else {

            console.log('找到了')
            let response = {code: 200, data: result};
            res.send(JSON.stringify(response));

        }
    });
})
// 查询博客内容
router.post('/getBlog', (req, res, next) => {
    //获取数据库数据
    connectDataBase();
    let id = req.body.id;
    // let sql=`select content from artical WHERE title="${title}"`;
    let sql = `select id,title,type,blogMarkdown,updateTime from blog WHERE id="${id}"`;
    console.log(sql)
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            //没找到
            console.log('没找到')
            let response = {code: 201, data: {desc: 'noData'}};
            res.send(JSON.stringify(response));
        } else {

            console.log('找到了')
            let response = {code: 200, data: result[0]};
            res.send(JSON.stringify(response));

        }
    });
})
// 增加博客
router.post('/addBlog', (req, res, next) => {
    connectDataBase();
    let title = req.body.title;
    let blogMarkdown = req.body.blogMarkdown;
    let blogHtml = req.body.blogHtml;
    let sql = `INSERT INTO blog (title,blogMarkdown,blogHtml) VALUES ("${title}","${blogMarkdown}","${blogHtml}")`
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
})
// 更新博客
router.post('/editBlog', (req, res, next) => {
    connectDataBase();
    let id = req.body.id;
    let title = req.body.title;
    let blogMarkdown = req.body.blogMarkdown;
    let blogHtml = req.body.blogHtml;
    let sql = `UPDATE blog SET title="${title}",blogHtml="${blogHtml}",blogMarkdown="${blogMarkdown}" WHERE id="${id}"`
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
})

//删除博客
router.post('/deleteBlog', (req, res, next) => {
    connectDataBase();
    let id = req.body.id;
    let sql = `DELETE FROM blog WHERE id="${id}"`
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
})
module.exports = router;
