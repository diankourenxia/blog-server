const flashModel = require('../database/models/flash')
const add = async (ctx, next) => {
  let result = {
    success: false,
    message: '保存失败'
  }
  if(!ctx.cookies.get('username')){
    result.message = '请登录'
    ctx.body = result
    next()
    return
  }
  const author = ctx.cookies.get('username')
  const {
    content,
    type,
    status
  } = ctx.request.body;

  const newFlash = new flashModel({
    author,
    type,
    content,
    status
  })
  await new Promise((res,rej)=>{
    newFlash.save(function(err,resp){
      if(err){
        result = {success: false, message: '保存失败'}
        rej(err)
      }
      else{
        result = {success: true, message: '保存成功'}
        res()
      }
    })
  }).then(d=>{
    ctx.body = result
    next()
  },error=>{
    return Promise.reject(error)
  }
 )
}
const list =async (ctx,next)=> {
  let result ={
    success:false,
    message:'获取失败'
  }
  const {type} =ctx.request.body;
  await new Promise((res,rej)=>{
    flashModel.find({type:type},(err,val)=>{
      if(err)rej(err)
      console.log(val)
      result ={
        success:true,
        data:val || []
      }
      res()
    })
  }).then(data=>{
    ctx.body = result;
    next()
  },err=>{
    result.message = err;
    ctx.body=result;
    next()
  })
}
const get =async (ctx,next)=> {
  let result ={
    success:false,
    message:'获取失败'
  }
  const {_id} = ctx.request.query
  await new Promise((res,rej)=>{
    flashModel.find({'_id':id},(err,val)=>{
      if(err)rej(err)
      result ={
        success:true,
        data:val || {}
      }
      res()
    })
  }).then(data=>{
    ctx.body = result;
    next()
  },err=>{
    result.message = err;
    ctx.body=result;
    next()
  })
}
const update = async (ctx, next) => {
  let result = {
    success: false,
    message: '保存失败'
  }
  if(!ctx.cookies.get('username')){
    result.message = '请登录'
    ctx.body = result
    next()
    return
  }
  const {_id,
    type, author,
    content,
    status
  } = ctx.request.body;
  await new Promise((res,rej)=>{
    flashModel.update({_id:_id},{ author, type,status,
      content},function(err,resp){
      if(err){
        result = {success: false, message: '保存失败'}
        rej(err)
      }
      else{
        result = {success: true, message: '保存成功'}
        res()
      }
    })
  }).then(d=>{
      ctx.body = result
      next()
    },error=>{
      rej(error)
    }
  )
}
module.exports ={
  'flash/list':list,
  'flash/add':add,
  'flash/get':get,
  'flash/update':update
}
