const  express = require("express");
const app = express();


const path = require("path");
const ejs = require('ejs');

const axios = require("axios");

//getting path of public folder
const static_path= path.join(__dirname,"/public")
//getting path of views folder
const views= path.join(__dirname,"/views")

app.use(express.static(static_path));
app.use(express.static(views));
app.use(express.json());

app.set("view engine", "ejs");

//import schema
const connectDB = require("./db/connection");

connectDB()

const blogdb =require("./model/scheme.js");

app.use(express.urlencoded({extended:false}));

// home and search 
app.get("/index",(req,res)=>{
    if(req.query.category){
        let user={};
            user = {category:req.query.category.split(',')};
           blogdb.find(user).then(blog=>{
            if(!blog){       
                res.render("error/error2")
                      }
                      else{  
                          console.log(blog)
                      res.render("category",{blog});
                  }}).catch(err=>{
                      res.render("error/error2");
                  })
                     }
          
else
{
    blogdb.find().then(blog=>{
        res.render("index",{blog})
    })
.catch(()=>{
    res.render("error/error2")
    })}
})
app.get("/index/:id",(req,res)=>{
    if(req.params.id){
       const id = req.params.id;
       blogdb.findById(id).then(blog=>{
           if(!blog){
               res.render("error/error2")
           }
           else{
               res.render("show",{blog})
           }
       }).catch(err=>{
           res.render("error/error2")
       })
   }
   else{
       res.render("error/error2")
   }
})

// show all blogs
app.get("/show_blogs",(req,res)=>{
    if(req.query.id)
    {
        const id = req.query.id;
        blogdb.findById(id).then(blog=>{
            if(!blog){
                res.render("error/error2")
            }
            else{
                res.render("show",{blog})
            }
        }).catch(err=>{
            res.render("error/error2")
        })
    }
    else{
        blogdb.find().then(blog=>{
            res.render("show_blogs",{blog})
        })
    .catch(()=>{
        res.render("error/error2")
        })}
    })
    
// create 
app.get("/create",(req,res)=>{
    res.render("create")
})


app.post("/index",async(req,res)=>{
    if(!req.body){
        res.status(400).render("error/error2")
    }
else{
    const blog = new blogdb
    ({
       author:req.body.author,
       title:req.body.title,
       discription:req.body.discription,
       image:req.body.image,
       date:req.body.date,
       category:req.body.category
    })
    blog.save(blog).then(blog=>{
        res.redirect("/index")
    })
    .catch(err=>
        {
            res.render("error/error1")
})}})


// update 
app.get("/update",(req,res)=>{
    if(req.query.id){
    const id= req.query.id;
    blogdb.findById(id).then(blog=>{
        if(!blog){
            res.render("error/error1");
        }
        else{
            res.render("update",{blog})
    }   
}).catch(err=>{
    res.render("error/error2");
})
}else{
    res.render("error/error1");

}})
// on click
app.post("/update/:id",(req,res)=>{
    if(!req.body.date){
        res.render("error/error1")
       }
       else if(!req.params.id){
        res.render("error/error1")
       }
   else{
    const id = req.params.id;
    blogdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false}).then(blog=>{
        if(!req.body){
            res.render("error/error2");
        }
       res.redirect("/index");
    }).catch(err=>{
        res.render("error/error1");
    })
   }
})




//delete
app.get("/delete/:id",(req,res)=>
{
    const id = req.params.id
    blogdb.findByIdAndDelete(id).then(blog=>
        {
            if(!blog){
                res.status(400).render("errors/error2") 
            }
            else{
                res.redirect("/index")
            }
        }).catch(err=>
            {
                res.render("errors/error2")
            })
})

app.listen("5000")