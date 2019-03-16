const mongoose = require('mongoose')
const flashSchema = new mongoose.Schema({
  type: String,
  content:String,
  author:String,
  status: String, //todo,done
  createTime:{
    type:Date,
    default:Date.now()
  },
  updateTime:{
    type:Date,
    default:Date.now()
  }
})
flashSchema.pre('save',function (next){
  if(this.isNew){
    this.status = 'todo'
    this.createTime = this.updateTime =Date.now()
  }else{
    this.updateTime = Date.now()
  }
  next()
})
const FlashModel =mongoose.model('Flash',flashSchema)
module.exports = FlashModel
