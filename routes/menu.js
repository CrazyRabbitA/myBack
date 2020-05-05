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

// 增加菜单
router.post('/addMenu', (req, res, next) => {
    connectDataBase();
    let newMenu = req.body.menu;
    let sql = `INSERT INTO menu (name) VALUES ("${newMenu}")`
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

//删除菜单
router.post('/deleteMenu', (req, res, next) => {
    connectDataBase();
    let deleteMenuId = req.body.id;
    let sql = `DELETE FROM menu WHERE id="${deleteMenuId}"`
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
// 更新菜单
router.post('/updateMenu', (req, res, next) => {
    connectDataBase();
    let newMenu = req.body.newMenu;
    let currentMenuId = req.body.currentMenuId;
    let sql = `UPDATE menu SET name="${newMenu}" WHERE id="${currentMenuId}"`
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
router.get('/getMenu', (req, res, next) => {
    //获取数据库数据
    console.log('收到请求了')
    connectDataBase();
    console.log('数据库连接正常')
    let sql="select * from menu";
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
