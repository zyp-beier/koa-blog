const Koa = require('koa');
const Route = require('@koa/router');
const serve = require('koa-static');
const njs = require('koa-nunjucks-2');
const app = new Koa();
const route = new Route();

const path = require('path');
const config = require('../cofig/cofig');

const list = require('./stor/list');
const userInfo = require('./stor/blog');


app.use(njs({
    path: path.join(__dirname, 'view'),
    ext: 'njk',
    nunjucksConfig:{
        trimBlock: true
    }
}));

route.get('/', async ctx => {
    await  ctx.render('login/login')
})

route.get('/index', async ctx => {
    await ctx.render('index',{
        userInfo,
        year:new Date().getFullYear()
    })
});

route.get('/list', async ctx => {
    await ctx.render('list',{
        list
    })
});

route.get('/item/:id', async ctx => {
    const {id = ''} = ctx.params
    const item = list.find(item => Number(id) === Number(item.id))
    console.log(item);
    if(!item){
        ctx.status = 404;
        return
    }
    await ctx.render('item',{
        id,
        item
    })
});

app.use(route.routes());
app.use(route.allowedMethods());
app.use(serve(path.join(__dirname,'../public')));


app.listen(config.port, function() {
    console.log('http://127.0.0.1:8081');
});
