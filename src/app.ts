import express, { Application, Request, Response } from "express";
import cors from "cors"
import exp from "constants";
import { userRoutes } from "./app/modules/user/user.routes";
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req:Request, res:Response) => { 
    res.send({
    message:"Doctors_prisma_backend server..."
})
})


app.use('/api/v1/user',userRoutes)

export default app