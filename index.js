const express=require('express')
const path= require('path')
const {connectToMongoDB}=require('./connect')

const app=express();
const PORT=8000;


//================mongoDB database connection===========================
connectToMongoDB("mongodb://localhost:27017/blogify").then(()=>{
    console.log("Connected to Mongodb");
});

//======================================================================



//==========================middlewares start=============================
app.use(express.urlencoded({extended:false}));
//==========================middlewares end===============================

//======Routes==========================================
const userRouter=require('./routes/user')

//======================================================

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));



app.use('/user',userRouter);
app.get('/', (req,res)=>{
    res.render("home");
})



app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})