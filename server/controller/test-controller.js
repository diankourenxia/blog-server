var userModel = require('../database/models/user');

const get = async (ctx, next) => {
  await userModel.find(function (err, data) {
    if (err) {
      return console.log(err)
    }
    else {
      resData = JSON.stringify(data)
    }
  })
  console.log(ctx)
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = resData;
  ctx.status = 200;
}
const getOneByUsername = async (ctx, next) => {
  const name = ctx.params.name
  const user = await userModel.findOne({username:name},function (err,data){
    if(err)console.log(err)
    resData = JSON.stringify(data)
  })
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body =  resData ;
  ctx.status = 200;
}
const add = async (ctx, next) => {
  const user1 = new userModel({'username': 'ussdf1', 'email': '234234','loginAttempts':1})
  await user1.save((err, data) => {
    if (err) console.log(err)
  })
  await userModel.find(function (err, data) {
   if(err) {
      return console.log(err)
    }
    else {
     console.log(data)
      resData = JSON.stringify(data)
    }
  })
  ctx.set('Access-Control-Allow-Origin', '*')
  console.log(ctx)
  ctx.body = '进来了';
  ctx.status = 200;
}
module.exports = {
  'test/get': get,
  'test/getOne/:name': getOneByUsername,
  'test/add': add
}