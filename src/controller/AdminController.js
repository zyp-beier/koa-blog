const AdminView = async ctx => {
    await ctx.render('admin/index')
};

const AdminPostsView = async ctx => {
    const {list} = ctx;
    await ctx.render('admin/posts',{
        list
    })
};

const AdminAdmin = async ctx => {
    await ctx.render('admin/admin')
};

const AdminPostsRemoveView = async ctx => {
    const {list} = ctx;
    const {id} = ctx.query;
    let index = list.findIndex((item) => {
        return String(item.id) === String(id)
    });
    list.splice(index,1);
    return ctx.redirect('/admin/posts')
};

const AdminPostsRemove = async ctx => {
    const {list} = ctx;
    let {title, content} = ctx.request.body
    let id = list[list.length - 1].id
    list.push({
        id:++id,
        title,
        content
    });
    return ctx.redirect('/admin/posts')
};

module.exports = {
    AdminView,
    AdminPostsView,
    AdminAdmin,
    AdminPostsRemoveView,
    AdminPostsRemove
};