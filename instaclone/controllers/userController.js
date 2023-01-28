const bcrypt= require('bcrypt')
const db= require('../models')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { post } = require('../routes/user')



//create main model
const User = db.users
const Post =db.posts

//create User

const addUser = async (req,res) =>{

     const users = await User.findOne({where: { username:req.body.username }});

  if(users==null){

    try { 
        const hashedPassword = await bcrypt.hash(req.body.password,10)
    
          let info ={
         username:req.body.username,
         name:req.body.name,
         password:hashedPassword,
         image:req.body.image,
       
            
     }

     const user = await User.create(info)
     res.status(200).send(user)
 } catch (e) {
     res.status(500).send(e)
     
 }

  }
  else{
    res.status(500).send('user already exist')
  }
     
   
    
   
}


//login user 

const loginuser = async (req,res) =>{

    const user = await User.findOne({ where: { username:req.body.username } });
     if(user ==null){
         return res.status(400).send('cannot find user')
     }

     try {
        
      if (await  bcrypt.compare(req.body.password,user.password)){
          
         const Uid =user.id
          const token =jwt.sign({Uid},process.env.ACCESS_TOKEN_SECRET);
           res.json({ accessToken: token})
        
         
          
      } else{
        res.status(400).send('not allowed')
      }
    } catch(e){
        res.status(500).send(e)
    }
        
        
      
   
   
}


//get all users

const getAllUsers = async (req,res,next)=> {
   
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
    const users = await User.findAll({limit,offset});
    
 
 res.status(200).send({page,size, data:users})

    
  } catch (error) {
    res.status(500).send(error.message);
    
  }
  

}


// get single User

const getOneUser = async (req,res) =>{

  const id =req.user.Uid;
  
  const result = await User.findOne({ where: { id}, attributes: ['username','name','image']});
  res.status(200).send(result)

 
}


// get update user

const updateUser = async (req,res) =>{

   try{
    const id =req.user.Uid;
    const user = await User.update(req.body, { where:{ id:id}})
    res.status(200).send('user updated successfully')
   }
    
   catch(error){
    res.status(500).send(error.message);
   }

    
    
  }

  // get delete user by id

const deleteUser = async (req,res) =>{


    let id = req.params.id
    
    await User.destroy({ where:  {id:id}})
    res.status(200).send('User deleted !')
   
  }

   //get user ads

   const userAds = async (req,res) =>{

    try{
      
      const id =req.user.Uid;
      const posts = await Post.findAll({ where:{user_id:id}});
      res.status(200).send(posts)
    }catch(error){
      res.status(500).send(error.message)
    }
      
     
    }
  


  

  module.exports ={
      addUser,
      loginuser,
      getAllUsers,
      getOneUser,
      userAds,
      updateUser,
      deleteUser
  }