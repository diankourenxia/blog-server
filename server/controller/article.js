const articleModel = require('../database/models/article')
const add = async (ctx, next) => {
  let result = {
    success: false,
    message: '保存失败'
  }
  const {
    title, author, tags,categories,
    content,
    describe
  } = ctx.request.body;
  const newArticle = new articleModel({
    title,
    author,
    tags,
    content,
    describe,
    categories
  })
  await new Promise((res,rej)=>{
    newArticle.save(function(err,resp){
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
    console.log(error)
  }
 )
}
const list =async (ctx,next)=> {
  let result ={
    success:false,
    message:'获取失败'
  }
  await new Promise((res,rej)=>{
    articleModel.find({},(err,val)=>{
      if(err)rej(err)
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
module.exports ={
  'article/list':list,
  'article/add':add
}