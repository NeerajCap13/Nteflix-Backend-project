import express from 'express'
import dotenv from 'dotenv'
import { ConnectDB } from '../DB/ConnectDB.js'
import routing from '../Routes/user.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

dotenv.config()

ConnectDB()
.then(()=>{
  app.listen(process.env.PORT, ()=>{
    console.log(`Server is now Listening ${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log("DB Not Connected" ,err)
})

app.use(cors({
  origin: ["https://nteflix-project.vercel.app", "http://localhost:5174"],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/netflix',routing)
