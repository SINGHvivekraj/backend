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

//routing
app.get("/",((req,res)=>{res.render("index")}));
app.get("/home",(req,res)=>res.send("Home Page"));
app.get("/about",(req,res)=>res.send("About Page"));

//starting a server on port 3000
app.listen(3000);


