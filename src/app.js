const Koa = require('koa');
const Route = require('@koa/router');
const serve = require('koa-static');
const njs = require('koa-nunjucks-2');
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const route = new Route();
const path = require('path');
const config = require('../cofig/cofig');
const session = require('koa-session');

const list = require('./stor/list');
const userInfo = require('./stor/blog');
const tagList = require('./stor/tag');
const {LoginView,Login} = require("./controller/LoginController");
const {AdminView, AdminPostsView, AdminAdmin,AdminPostsRemoveView,AdminPostsRemove} = require("./controller/AdminController");
const {IndexView,ListView,ItemView} = require("./controller");
const {checkAuth} = require("./middleware/chinkLogin");

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

route.get('/', IndexView);

route.get('/list', ListView);

route.get('/item/:id', ItemView);

route.get('/login.html', Login);

route.post('/login', LoginView);

route.get('/admin',checkAuth(), AdminView);

route.get('/admin/posts',checkAuth(), AdminPostsView);

route.get('/admin/admin', checkAuth(), AdminAdmin);

route.get('/admin/posts/remove',AdminPostsRemoveView);

route.post('/admin/posts/create', AdminPostsRemove);

app.use(route.routes());
app.use(route.allowedMethods());
app.use(serve(path.join(__dirname,'../public')));


app.listen(config.port, function() {
    console.log('http://127.0.0.1:8081');
});
