var userModel = require('../database/models/user');

const login = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  let result = {
    success: false,
    message: '用户不存在'
  };
  const {username, password} = ctx.request.body;
  //检查数据库中是否存在该用户名
  console.log(2)
  try{
    let user = await  userModel.findOne({
      username
    }, (err, user) => {
      if(err) throw err
      else if (!user) return Promise.reject({message:'无用户'})
      else return Promise.resolve(user)
    })
      //判断密码是否正确
    console.log(1)
    let passwordResult = await  user.comparePassword(password,user.password)
    console.log(passwordResult)
    if(passwordResult){
      ctx.cookies.set(
        'username',user.username,{
          domain:ctx.request.header.host.indexOf('localhost')!==-1?'localhost':'nghugh.com', // 写cookie所在的域名
          path:'/',       // 写cookie所在的路径
          maxAge: 2*60*60*1000,   // cookie有效时长
          httpOnly:false,  // 是否只用于http请求中获取
          overwrite:false  // 是否允许重写
        }
      )
      result = {success: true, message: '登入成功'}

    }else{
      result ={success:false,message:'密码错误'}
    }
    ctx.body = result
  }catch(err){
    console.log(err)
    result= {success: false, message: '登录失败'}
    ctx.body = result
  }

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
  },error=>{
    console.log(error)
  })
}
module.exports = {
  'admin/login': [login],
  'admin/register': [register],
}
