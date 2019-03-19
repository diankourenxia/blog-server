isLogin = async (ctx,next)=>{
  if(!ctx.cookies.get('username')){
    ctx.body = {
      success: false,
      message: '请登录',
      isLogin: false,
    }
    console.log(2)
  }else{
    console.log(1)
    await next()
  }
}

module.exports =  isLogin
