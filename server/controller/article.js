const articleModel = require('../database/models/article')
const add = async (ctx, next) => {
  let result = {
    success: false,
    message: '保存失败'
  }
  const {
    title, author, tags,
    content,
    describe
  } = ctx.request.body;
  const newArticle = new articleModel({
    title,
    author,
    tags,
    content,
    describe
  })
  await new Promise((res,rej)=>{

  }).then(d=>{
    next()
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