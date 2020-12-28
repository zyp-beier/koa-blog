const Koa = require('koa');
const Route = require('@koa/router');
const serve = require('koa-static');
const njs = require('koa-nunjucks-2');
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const route = new Route();

const path = require('path');
const config = require('../cofig/cofig');

const list = require('./stor/list');
const userInfo = require('./stor/blog');
const tagList = require('./stor/tag')


app.use(njs({
    path: path.join(__dirname, 'view'),
    ext: 'njk',
    nunjucksConfig:{
        trimBlock: true
    }
}));
app.use(bodyParser())

route.get('/login.html', async ctx => {
    await  ctx.render('login/login')
});

route.post('/login', async ctx => {
    const {userName,psd} = userInfo
    const {username,password} = ctx.request.body;
    let state = 0
    if(username === userName && password === psd) {
        state = 1
    }else if((username && username === userName) && password !== psd) {
        state = -1
    }
    await ctx.render('requestResult/requestResult',{state})
});

route.get('/', async ctx => {
    await ctx.render('index',{
        userInfo,
        year:new Date().getFullYear(),
        tagList
    })
});

route.get('/list', async ctx => {
    await ctx.render('list',{
        userInfo,
        list
    })
});

route.get('/item', async ctx => {
    const {id = ''} = ctx.query
    const item = list.find(item => Number(id) === Number(item.id))
    if(!item){
        ctx.status = 404;
        return
    }
    await ctx.render('item',{
        id,
        item
    })
});

route.get('/admin',async ctx => {
    await ctx.render('admin/index')
})

route.get('/admin/posts', async ctx => {
    await ctx.render('admin/posts',{
        list
    })
})
route.get('/admin/admin', async ctx => {
    await ctx.render('admin/admin')
});

route.get('/admin/posts/remove',async ctx => {
    const {id} = ctx.query;
     let index = list.findIndex((item) => {
         return String(item.id) === String(id)
     });
   list.splice(index,1)
    return ctx.redirect('/admin/posts/remove')
});

route.post('/admin/posts/create', async ctx => {
    let {title,content} = ctx.request.body;
    console.log(title,content)
    let id = list[list.length - 1].id;
    list.push({
        id: id++,
        title,
        content,
    })
    return ctx.redirect('/admin/posts')
})

app.use(route.routes());
app.use(route.allowedMethods());
app.use(serve(path.join(__dirname,'../public')));


app.listen(config.port, function() {
    console.log('http://127.0.0.1:8081');
});
