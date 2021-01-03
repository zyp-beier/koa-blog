const Koa = require('koa');
const serve = require('koa-static');
const njs = require('koa-nunjucks-2');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const path = require('path');
const config = require('../cofig/cofig');
const session = require('koa-session');

const list = require('./stor/list');
const userInfo = require('./stor/blog');
const tagList = require('./stor/tag');
const {initAdminRouter} = require("../router/AdminRouter");
const {initBlogRouter} = require("../router/blogRouter");

app.keys = ['asdfghjkl'];
app.use(session({},app));
app.use(njs({
    path: path.join(__dirname, 'view'),
    ext: 'njk',
    nunjucksConfig:{
        trimBlock: true
    }
}));
app.use(bodyParser());

app.use(async (ctx,next) => {
    ctx.userInfo = userInfo;
    ctx.tagList = tagList;
    ctx.list = list;
    return next()
});

initBlogRouter(app);
initAdminRouter(app);



app.use(serve(path.join(__dirname,'../public')));

app.listen(config.port, function() {
    console.log('http://127.0.0.1:8081');
});
