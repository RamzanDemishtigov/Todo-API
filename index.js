import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRouter from "./routes/auth.js"
import usersRouter from "./routes/users.js"
import todosRouter from "./routes/todos.js"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for todo',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

dotenv.config()
const app = express()

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to database")
    } catch(err) {
        throw err;
    }
};

//middlewares
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/users',usersRouter)
app.use('/api/todos',todosRouter)
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})

app.listen(4000,()=>{
    connect()
    console.log(`Server is working on port 4000`)
})