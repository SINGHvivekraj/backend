//console.log("learning backend");
// const a=60;
// const b=7;
// console.log("this is ",a+b);

const exp=require("express");
const app=exp();

//setting the view for rendering html file on a server route
app.set('view engine','ejs');

//custom middleware
app.use((req,res,next)=>{
    let p=2;
    let q=5;
    console.log("Its a custom middleware",p+q);
    return next();
})

//third party middle-ware
const morg=require('morgan');
app.use(morg('dev'));

app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());

//to link static files
app.use(exp.static('public'));

//to link the usermodel 
const usermodel=require('./models/user');

//to lonk the db connection
const connetion=require('./config/db');


//routing
app.get("/",((req,res)=>{res.render("index")}));
app.get("/home",(req,res)=>res.send("Home Page"));
app.get("/about",(req,res)=>res.send("About Page"));

app.get("/get-form-data",(req,res)=>{
    console.log(req.query);
    res.send('data received');
})

//using post method 
app.post("/get-form-data",(req,res)=>{
    console.log(req.body);
    res.send('data received');
})

//working with mongodb form
app.get("/register",(req,res)=>{res.render('dbusers')});

//CRUD OPERATIONS
//C-CREATE
app.post("/create-new-user",async (req,res)=>{
    console.log(req.body);
    const{ username ,email ,passworddd }=req.body;
    const newuser=await usermodel.create({username:username,email:email,password:passworddd});
    res.send(newuser);
})

//R-READ
app.get("/get-users",(req,res)=>{
    usermodel.find().then((allusers)=>{res.send(allusers)});
})

//U-UPDATE
app.get("/update-user",async(req,res)=>{
    const updateduser=await usermodel.findOneAndUpdate({username:'siya'},{email:'siya@singham.com'});
    res.send(updateduser);
})

//D-DELETE
app.get("/delete-user",async(req,res)=>{
    await usermodel.findOneAndDelete({username:'siya'});
    res.send('user deleted');
})





//starting a server on port 3000
app.listen(3000);


