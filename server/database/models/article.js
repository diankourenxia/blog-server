const mongoose = require('mongoose')
const articleSchema = new mongoose.Schema({
  title:{
    unique: true,
    type: String,
    required: true
  },
  content:String,
  author:String,
  createTime:{
    type:Date,
    default:Date.now()
  },
  updateTime:{
    type:Date,
    default:Date.now()
  },
  tags:[String],
  categories:[String],
  desc:String
})
articleSchema.pre('save',function (next){
  if(this.isNew){
    this.createTime = this.updateTime =Date.now()
  }else{
    this.categories = []
    this.tags = []
    this.updateTime = Date.now()
  }
  next()
})
const ArticleModel =mongoose.model('Article',articleSchema)
module.exports = ArticleModel
