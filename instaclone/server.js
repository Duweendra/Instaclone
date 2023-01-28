require('dotenv').config()
const express = require('express')
const cors = require('cors')




const app= express()

var corOptions ={
      origin : 'https://localhost:8000'
}



//middleware
app.use(cors(corOptions))

app.use(express.json())

app.use(express.urlencoded({extended :true}))

app.use('/images', express.static('images'))


//routers

const router =require('./routes/post')
app.use('/api/posts',router)

const router1 =require('./routes/user')
app.use('/api/users',router1)

//port

const PORT = process.env.PORT ||8000

//server

app.listen(PORT,() =>{
    console.log(`server is runing port ${PORT}`)
})