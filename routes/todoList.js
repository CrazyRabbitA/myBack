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
    let time=moment().format('MMMM Do YYYY, h:mm:ss a');
    let sql = `INSERT INTO todoList (content,type,updateTime) VALUES ("${content}","${type}","${time}")`
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
    let time=moment().format('MMMM Do YYYY, h:mm:ss a');
    let sql = `UPDATE todoList SET type="${type=='1'?'0':'1'}",updateTime="${time}" WHERE id="${id}"`
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
    let time=moment().format('MMMM Do YYYY, h:mm:ss a');
    let sql = `UPDATE todoList SET content="${content}",updateTime="${time}" WHERE id="${id}"`
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


// 增加二级菜单
router.post('/addSubMenu', (req, res, next) => {
    console.log('增加子菜单')
    connectDataBase();
    let id=req.body.id;
    let subName=req.body.subName;
    console.log(id,subName)
    let sql = `UPDATE menu SET subName="${subName}" WHERE id="${id}"`
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
// 删除二级菜单
router.post('/deleteSubMenu', (req, res, next) => {
    let id=req.body.id;
    let newSubMenu=req.body.newSubMenu;
    console.log(id,newSubMenu)
    let sql = `UPDATE menu SET subName="${newSubMenu}" WHERE id="${id}"`
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
// 修改二级菜单
router.post('/updateSubMenu', (req, res, next) => {
    let id=req.body.id;
    let newSubMenu=req.body.newSubMenu;
    console.log(id,newSubMenu)
    let sql = `UPDATE menu SET subName="${newSubMenu}" WHERE id="${id}"`
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
//查询二级菜单
router.post('/getSubMenu', (req, res, next) => {
    console.log('获取二级菜单')
    connectDataBase();
    console.log('数据库连接成功')
    let id = req.body.id;
    console.log(id)
    let sql=`select subName from menu WHERE id=${id}`;
    console.log(sql)
    connection.query(sql, function (err, result) {
        console.log('开始查询二级菜单')
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        } else {
            console.dir(result)
            let tempArr=[];
            if(result[0].subName){
                tempArr=result[0].subName.split('|');
            }
            let response = {code: 200, data: tempArr};
            res.send(JSON.stringify(response));
        }
    });
    connection.end();
})


module.exports = router;
