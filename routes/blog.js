const express=require('express')
const multer  = require('multer')
const path=require('path')
const {handleCreateBlog,handleBlogRendering}=require('../controllers/blog')
const blogRouter=express.Router();



//======================Multer strorage object for fike uploading=================
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const filename=`${Date.now()}-${file.originalname}`;
      cb(null,filename);
    }
  })
const upload = multer({ storage: storage })

//================================================================================



blogRouter.get("/add-new",(req,res)=>{
    return res.render("addBlog",{
        user:req.user
    })
})

blogRouter.get("/:id", handleBlogRendering);


blogRouter.post("/",upload.single('coverImage'),handleCreateBlog);




module.exports=blogRouter;
