const articleModel = require('../database/models/article')
const add = async (ctx,next) => {
  articleModel.save({
    title:''
  })
}