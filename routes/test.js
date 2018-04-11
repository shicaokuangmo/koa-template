const router = require('koa-router')()
const testApi = require('../api/test/testAPIs')
const userDAOs = require('../modules/user/userDAOs')

router.get('/', async (ctx, next) => {

    // console.log("ctx.query.userName",ctx.query.userName)
    // console.log("ctx.query.userPass",ctx.query.userPass)
	
    let res = await userDAOs().getUserInfo(ctx.query.userName, ctx.query.userPass);

    // console.log("res", res)

	// let { data } = await testApi.test({})
	ctx.body = JSON.stringify(res)
})

router.get('/add', async (ctx, next) => {

    // console.log("ctx.query.userName",ctx.query.userName)
    // console.log("ctx.query.userPass",ctx.query.userPass)

    let { data } = await userDAOs().addUser(ctx.query.userName, ctx.query.userPass);

    // let { data } = await testApi.test({})
    ctx.body = JSON.stringify(data)
})

router.get('/login', async (ctx, next) => {
    await ctx.render("login/login", {
    });
})

module.exports = router
