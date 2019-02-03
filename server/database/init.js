const mongoose = require('mongoose'),
  DB_URL = 'mongodb://localhost/blog';
const glob = require('glob')
const {resolve} = require('path')
mongoose.Promise = global.Promise
exports.initSchemas = ()=>{
  glob.sync(resolve(__dirname,'models','**/*js')).forEach(require)
}
exports.connect = ()=>{
  mongoose.connect(DB_URL);
  mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
  });
  mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
  });
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
  });
}

exports. mongoose;
