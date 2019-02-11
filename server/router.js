const Router = require('koa-router')
const router = new Router({
  prefix: '/api', // 统一前缀，接口全部为 /api/xxx 格式
})

const testController = require('./controller/test-controller')
const adminController = require('./controller/admin')
const allController = Object.assign(testController,adminController)
console.log(allController)
Object.keys(allController).forEach(key=>{
  router.all("/"+key, allController[key]);   // router.all是允许所有的访问方式，如果需要限定则改为指定方式即可
})

module.exports = router;