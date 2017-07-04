/**
 * Created by 1t8l7j2 on 2017/7/4.
 */
const express = require('express');
const handlebars = require('express3-handlebars').create({defaultLayout:'layout'});
const fortune = require('./lib/fortune.js');
/**
 *
 * 创建一个express应用
 */
const app = express();

/**
 * 设置模板引擎
 */
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

/**
 * 设置node应用程序的环境端口号
 */
const port = process.env.PORT || 3000;

/**
 * 设置静态文件资源
 */
app.use(express.static(__dirname + '/public'));

/**
 * 测试页面
 */
app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

/**
 * 设置页面路由
 */
app.get('/',function (req, res) {
    res.render('home');
});
app.get('/about',function (req, res) {
    res.render('about',{
        fortune:fortune.getFortune(),
        pageTestScript:'/qa/tests-about.js'
    });
});

/**
 * 设置404页面
 */
app.use(function (req,res,next) {
    res.status(404);
    res.render('404');
});

/**
 * 设置500页面
 */
app.use(function (err,req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

/**
 * 监听
 */

app.listen(port);
console.log('Express started on http://localhost:' + port + ';press Ctrl-c to terminate');