const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const index = require('./routes/index')
const users = require('./routes/users')
const test = require('./routes/test')
// 中间件-异常捕获
const exceptionHandler = require('./middlewares/ExceptionHandler')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'jade'
}))

app.use(exceptionHandler());
// routes
/*app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())*/
app.use(test.routes(), test.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
