const mongoose = require('mongoose')

const {ObjectId }= mongoose.Schema.Types
const categorySchema = new mongoose.Schema({
  name:String,
  articles:[
    {type:ObjectId,
    ref:'Article'}
  ],
  createTime:{
    type:Date,
    default:Date.now()
  },
  updateTime:{
    type:Date,
    default:Date.now()
  }
})
categorySchema.pre('save',function (next){
  if(this.isNew){
    this.createTime = this.updateTime =Date.now()
  }else{
    this.updateTime = Date.now()
  }
  next()
})
const CategoryModel =mongoose.model('Category',categorySchema)
module.exports = CategoryModel