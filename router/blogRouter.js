const Route = require('@koa/router');
const {
    LoginView,
    Login} = require("../src/controller/LoginController");
const {ItemView,
    ListView,
    IndexView} = require("../src/controller");

const BlogRouter = new Route();



BlogRouter.get('/',IndexView);

BlogRouter.get('/list', ListView);

BlogRouter.get('/item/:id', ItemView);

BlogRouter.get('/login.html', Login);

BlogRouter.post('/login', LoginView);


const initBlogRouter = (app) => {
  app.use(BlogRouter.routes());
  app.use(BlogRouter.allowedMethods());
};

module.exports = {
    initBlogRouter
};