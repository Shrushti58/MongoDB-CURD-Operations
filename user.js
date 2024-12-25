const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/testapp1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
  });
  
const userSchema=mongoose.Schema({
    image:String,
    email:String,
    name:String
})


module.exports=mongoose.model('user',userSchema);