const articleModel = require('../database/models/article')
const isLogin = require('./utils')
const deletePro = (request)=>{
  return new Promise((res,rej)=>{
    articleModel.remove(request,(err,resp)=>{
      if(err)rej(err)
      else res(resp)
    })
  })
}
const deleteByTitle = async (ctx,next)=>{
  try {
    const {title} =ctx.request.body;
    await deletePro({title})
  }catch(err){
    console.log(err)
  }
}
const add = async (ctx, next) => {
  let result = {
    success: false,
    message: '保存失败'
  }
  const {
    title, tags,categories,
    content,
    describe
  } = ctx.request.body;
  const newArticle = new articleModel({
    title,
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
  })
}
const get =async (ctx,next)=> {
  let result ={
    success:false,
    message:'获取失败'
  }
  const {title} = ctx.request.query
  await new Promise((res,rej)=>{
    articleModel.find({'title':title},(err,val)=>{
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
  })
}
const update = async (ctx, next) => {
  let result = {
    success: false,
    message: '保存失败'
  }
  const {_id,
    title, author, tags,categories,
    content,
    describe
  } = ctx.request.body;
  await new Promise((res,rej)=>{
    articleModel.update({_id:_id},{ title, author, tags,categories,
      content,
      describe},function(err,resp){
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

    }

  )
}
module.exports ={
  'article/list':[list],
  'article/add':[add,isLogin],
  'article/get':[get],
  'article/update':[update,isLogin],
  'article/delete':[deleteByTitle,isLogin],
}
