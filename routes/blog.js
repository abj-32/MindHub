const express=require('express')
const multer  = require('multer')
const path=require('path')
const {handleCreateBlog,handleBlogRendering}=require('../controllers/blog')
const blogRouter=express.Router();
const Comment=require('../models/comment')



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



blogRouter.post("/comment/:blogId", async (req,res)=>{
  const comment=await Comment.create({
    content:req.body.content,
    blogId:req.params.blogId,
    createdBy:req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
})


blogRouter.post("/",upload.single('coverImageurl'),handleCreateBlog);




module.exports=blogRouter;
