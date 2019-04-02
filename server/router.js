const Router = require('koa-router')
const router = new Router({
  prefix: '/api', // 统一前缀，接口全部为 /api/xxx 格式
})

// const testController = require('./controller/test')
const adminController = require('./controller/admin')
const articleController = require('./controller/article')
const flashController = require('./controller/flash')
const uploadController = require('./controller/upload')
const allController = Object.assign(adminController,articleController,flashController,uploadController)
Object.keys(allController).forEach(key=>{
  console.log(allController[key])
  router.all("/"+key,...allController[key])// router.all是允许所有的访问方式，如果需要限定则改为指定方式即可
})
console.log(9)
module.exports = router
