/**
 * Created by 1t8l7j2 on 2017/7/4.
 */
const express = require('express');

/**
 *
 * 创建一个express应用
 */

 const app = express();

/**
 * 设置node应用程序的环境端口号
 */
const port = process.env.PORT || 3000;

/**
 * 设置页面路由
 */
app.get('/',function (req, res) {
    res.type('text/plain');
    res.send('Meadowlark Travel');
});
app.get('/about',function (req, res) {
    res.type('text/plain');
    res.send('About Meadowlark Travel');
});

/**
 * 设置404页面
 */
app.use(function (req,res) {
    console.log(45);
    res.type('text/plain');
    res.status(404);
    res.send('404 Not Found');
});

/**
 * 设置500页面
 */
app.use(function (err,req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error')
});

/**
 * 监听
 */

app.listen(port);
console.log('Express started on http://localhost:' + port + ';press Ctrl-c to terminate');