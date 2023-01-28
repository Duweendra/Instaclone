module.exports =(sequelize,DataTypes) =>{

    const Post = sequelize.define("post",{
         topic:{
             type: DataTypes.STRING,
             
         },
         createdTime:{
            type: DataTypes.STRING
         },
         likes:{
              type: DataTypes.INTEGER
         },
        image:{
        type: DataTypes.TEXT
        }
    })

    return Post
}