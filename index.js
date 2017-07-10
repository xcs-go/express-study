/**
 * Created by 1t8l7j2 on 2017/7/4.
 */
const express = require('express');
const handlebars = require('express3-handlebars').create({
    defaultLayout:'layout',
    helpers:{
        section:function (name, options) {
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
const formidable = require('formidable');
const jqupload = require('jquery-file-upload-middleware');

const credentials = require('./credentials');
const fortune = require('./lib/fortune.js');
const getWeatherData = require('./lib/weather.js');

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
 * 中间件
 */
app.use(function (req, res, next) {
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = getWeatherData.default;
    next();
});

app.use(require('body-parser')());
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')());

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
app.get('/tours/hood-river',function (req, res) {
    res.render('tours/hood-river');
});
app.get('/tours/request-group-rate',function (req, res) {
    res.render('tours/request-group-rate');
});

app.get('/nursery-rhyme',function (req, res) {
    res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme',function (req, res) {
    res.json({
        animal:'squirrel',
        bodyPart:'tail',
        adjective:'bushy',
        noun:'heck'
    });
});

/**
 * 表单处理
 */

app.get('/newsletter',function (req, res) {
    res.render('newsletter',{csrf:'CSRF token goes here'});
});

app.post('/process',function (req, res) {
    console.log(req.accepts());
   if(req.xhr || req.accepts('json,html') === 'json'){ // req.accepts()方法用于询问最佳返回格式
       res.send({success:true})
   }else {
       res.redirect(303,'/thank you');
   }
});

/**
 * 文件上传路由
 */
app.get('/contest/vacation-photo',function (req, res) {
    let now = new Date();
    res.render('contest/vacation-photo',{
        year:now.getFullYear(),
        month:now.getMonth() + 1
    })
});
app.post('/contest/vacation-photo/:year/:month',function (req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req,function (err, fields, files) {
        if(err) return res.redirect(303,'/error');
        console.log('received fields:');
        console.log(fields);
        console.log('received files:');
        console.log(files);
        res.redirect(303,'/thank-you');
    })
});

/**
 * jquery 文件上传
 */
app.use('/upload',function (req, res, next) {
    let now = Date.now();
    jqupload.fileHandler({
        uploadDir:function () {
            return __dirname + '/public/uploads' + now;
        },
        uploadUrl:function () {
            return '/uploads' + now;
        }
    })(req,res,next)
});

app.get('/thank-you',function (req, res) {
    res.send('thank you');
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

if(app.thing == null) console.log('bleat!');