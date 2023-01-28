
const db= require('../models')


//create main model
const User = db.users
const Post =db.posts



//create post

const addPost = async (req,res) =>{

   try{ 
     let info ={
    topic:req.body.topic,
    image:req.file.path,
    user_id: req.user.Uid   
}

const post = await Post.create(info)
res.status(200).send(post)
 console.log(req.file);
}
catch(e){
  res.status(500).send(e.message);
}   

    
  
}


//get all posts

const getPosts = async (req,res,next)=> {
   
  try { 

    let{page,size} =req.query;
    
    if(!page){
      page=1;
    }
    if(!size){
      size=5;
    }
    const limit =parseInt(size);
    const offset =(page-1)*size;
    const posts = await Post.findAll({limit,offset});
    
 
 res.status(200).send({page,size, data:posts})

    
  } catch (error) {
    res.status(500).send(error.message);
    
  }
  

}


// get single post

const getOnePost = async (req,res) =>{

try{let id = req.params.id
  let post = await Post.findOne({ where:{id:id}})
  res.status(200).send(post)
}catch(error){
  res.status(500).send(error.message)
}
  
 
}


//  update like

const setLikes = async (req,res) =>{

 try{
   let info ={
  likes:req.body.likes
}

  let id = req.params.id
  
  const post = await Post.update( info, { where:{ id:id}})
  res.status(200).send('post like updated successful')
  }
  catch(error){
  res.status(500).send(error.message)
  } 
   
  }

  // get delete post  by id

/* const deleteAdvertisment = async (req,res) =>{


    let id = req.params.id
    
    await Advertisment.destroy({ where:  {id:id}})
    res.status(200).send('advertisment deleted !')
   
  } */

  function paginationResults(model){
    return(req,res,next) => {
      const page =parseInt(req.query.page)
      const limit =parseInt(req.query.limit)

      const startIndex =(page-1) *limit
      const endIndex =page*limit

      const results ={}

      if(endIndex <model.length){
        results.next ={
          page:page +1,
          limit:limit
        }
      }

      results.results =model.slice(startIndex,endIndex)

      res.paginationResults =results
      next()
    }
  }

  module.exports ={
    addPost,
    getPosts,
      getOnePost,
      setLikes
     
  }