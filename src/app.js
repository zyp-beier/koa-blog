const Koa = require('koa')
const Route = require('@koa/router')
const serve = require('koa-static')
const njs = require('koa-nunjucks-2')
const app = new Koa()
const route = new Route()
const path = require('path')
const config = require('../cofig/cofig')

app.use(njs({
    path: path.join(__dirname, 'view'),
    ext: 'njk',
    nunjucksConfig:{
        trimBlock: true
    }
}))


route.get('/', async ctx => {
    const time = new Date()
    await ctx.render('index',{
        name: 'my blog',
        time: time
    })
})

route.get('/list', async ctx => {
    const list = [
        {
            id: 1,
            title: '第一个日志'
        },
        {
            id: 1,
            title: '第一个日志'
        },
        {
            id: 1,
            title: '第一个日志'
        }
    ]
    await ctx.render('list',{
        list:list
    })
})

app.use(route.routes())
app.use(route.allowedMethods());
app.use(serve(path.join(__dirname,'../public')))


app.listen(config.port, function() {
    console.log('http://127.0.0.1:3000');
})  