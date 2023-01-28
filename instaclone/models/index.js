const { Sequelize, DataTypes } = require('sequelize')
const dbconfig = require('../config/db.config')


const sequelize = new Sequelize(

    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD,{
        host: dbconfig.HOST,
        dialect: dbconfig.dialect,
        operatorsAliases:false,

        pool: {
            max: dbconfig.pool.max,
            min: dbconfig.pool.min,
            acquire: dbconfig.pool.acquire,
            idle:dbconfig.pool.idle
        }
    }
)

sequelize.authenticate()
.then( ()=>{
    console.log('connected...')
})
.catch(err =>{
    console.log('Error'+err)
})

const db ={}

db.Sequelize =Sequelize
db.sequelize =sequelize

db.posts =require('./PostModel.js')(sequelize,DataTypes)
db.users =require('./UserModel.js')(sequelize,DataTypes)

db.sequelize.sync({ force:false})
.then(()=>{
    console.log('yes re-sync done!')
})

//1 to many relation
db.users.hasMany(db.posts,{
    foreignKey:'user_id',
    as: 'post'
})

db.posts.belongsTo(db.users,{
    foreignKey:'user_id',
    as: 'user'
})


module.exports =db