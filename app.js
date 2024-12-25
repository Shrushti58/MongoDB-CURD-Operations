const express=require('express')
const app=express();
const path=require('path')
const userModel=require('./models/user');
const { render } = require('ejs');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
    res.render("index")
})

//creating User
app.get('/read',async function(req,res){
    let allusers=await userModel.find()
    res.render("read",{users:allusers})
})

app.post('/create',async function(req,res){
    let {name,email,image}=req.body;
   let createdUser= await userModel.create({
        name:name,
        email:email,
        image:image
    })
    console.log(createdUser);
    res.redirect('/read')
    
})


app.get('/edit/:id',async function(req,res){
    let editUser=await userModel.findOne({_id:req.params.id});
    console.log(editUser.name)
    res.render("edit",{editUser})
})

//deleteFunction
app.get('/delete/:id',async function(req,res){
    let deletedUser=await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect('/read');
})

app.post('/update/:id',async function(req,res){
    let {image,name,email}=req.body;
    let user=await userModel.findOneAndUpdate({_id:req.params.id},{name,image,email});
    res.redirect("/read")
})

app.listen(3000);