const Router = require('@koa/router');
const {checkAuth} = require("../src/middleware/chinkLogin");
const {AdminPostsRemove,
    AdminPostsRemoveView,
    AdminAdmin,
    AdminPostsView,
    AdminView
} = require("../src/controller/AdminController");

const AdminRouter = new Router({
    prefix: '/admin'
});
AdminRouter.use(checkAuth());

AdminRouter.get('/', AdminView);

AdminRouter.get('/posts', AdminPostsView);

AdminRouter.get('/admin', AdminAdmin);

AdminRouter.get('/posts/remove', AdminPostsRemoveView);

AdminRouter.post('/posts/create', AdminPostsRemove);


const initAdminRouter = (app) => {
    app.use(AdminRouter.routes());
    app.use(AdminRouter.allowedMethods())
};

module.exports = {
    initAdminRouter,
};