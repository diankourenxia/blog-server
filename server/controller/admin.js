var userModel = require('../database/models/user');

const login = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  let result = {
    success: false,
    message: '用户不存在'
  };
  const {username, password} = ctx.request.body;
  //检查数据库中是否存在该用户名
  await new Promise((res,rej)=>{
    userModel.findOne({
      username
    }, (err, user) => {
      if (err) {
        throw err;
      }
      if (!user) {
        res()
      } else {
        //判断密码是否正确
        user.comparePassword(password,user.password).then(
          data => {
            result = {success: data?true:false, message: data?'登入成功':'密码错误'}
            res()
          }, error => {
            result= {success: false, message: '登录失败'}
            rej(error)
          }
        )
      }
    })
  }).then(data=>{
    ctx.body=result;
    next()
  },err=>{
    console.log(err)
  })

};
const register = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  let result = {
    success: false,
    message: '注册失败'
  }
  const {username, password, email} = ctx.request.body;

  const newUser = new userModel({
    username,
    password,
    email
  });
  await new Promise((resolve,rej)=>{
    newUser.save(function (err, res) {
      if (err) {
        result = {success: false, message: '注册失败'}
        rej(err)
      }
      else {
        result = {success: true, message: '注册成功'}
        resolve()
      }
    })
  }).then(data=>{
    ctx.body = result
    next()
  },error=>{
    console.log(error)
  })
}
module.exports = {
  'admin/login': login,
  'admin/register': register,
}