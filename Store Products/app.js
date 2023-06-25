const express = require('express')
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')
const categoryRouter = require('./routers/category')

const app = express()
app.use(express.json())
app.use(userRouter)
app.use(categoryRouter)
app.use(productRouter)
  
const port = process.env.PORT || 3000
app.listen(port, ()=>{
  console.log(`Server running on: http://localhost:${port}`)
})