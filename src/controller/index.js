const IndexView = async ctx => {
    const{userInfo,tagList} = ctx;
    await ctx.render('index', {
        userInfo,
        tagList,
    })
};

const ListView = async ctx => {
    const {userInfo,list} = ctx;
    await ctx.render('list', {
        userInfo,
        list
    })
};

const ItemView = async ctx => {
    const {list} = ctx;
    const {id = ''} = ctx.params;
    const item = list.find(item => Number(id) === Number(item.id))
    if(!item){
        ctx.status = 404;
        return
    }
    await ctx.render('item',{
        id,
        item
    })
}
module.exports = {
    IndexView,
    ListView,
    ItemView
};