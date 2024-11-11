const Blog=require('../models/blog')


async function handleCreateBlog(req,res){

    // console.log(req.body);
    // console.log(req.file);
    const {title,body}=req.body;
    const blog =await Blog.create({
        title,
        body,
        createdBy:req.user._id,
        coverImageurl:`/uploads/${req.file.filename}`,

    })
    return res.redirect(`/blog/${blog._id}`);
}

async function handleBlogRendering(req,res){
    const blog= await Blog.findById(req.params.id).populate("createdBy");
    // console.log(blog);
    res.render("blog",{
        user:req.user,
        blog,
    });
}

module.exports={
    handleCreateBlog,handleBlogRendering
}