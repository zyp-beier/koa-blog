const LoginView = async ctx => {
    const {userInfo} = ctx;
    const {userName,psd} = userInfo;
    const {username,password} = ctx.request.body;
    let state = 0;
    if(username === userName && password === psd) {
        ctx.session.username = username;
        ctx.session.isLogin = true;
        await ctx.render('admin/index');
    }else if((username && username === userName) && password !== psd) {
        state = -1;
        await ctx.redirect('/login.html',{state})
    }else{
        await ctx.redirect('/login.html',{state})
    }
};

const Login = async ctx => {
    await  ctx.render('login/login')
};

module.exports = {
    LoginView,
    Login
};