const checkAuth = (options) => {
    return async (ctx,next) => {
        const {username,isLogin} = ctx.session;
        if(username && isLogin) {
          return next()
        }
        ctx.set('content-type','text/html;charset=utf8');
        return ctx.body = '请登录' +
            "<script> setTimeout(() => {location.href='/login.html'},3000)</script>"
    }
};

module.exports = {
    checkAuth,
};