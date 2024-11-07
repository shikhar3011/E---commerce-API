import express, { Router } from 'express'
import mongoose from 'mongoose';
import bodyParser from 'express';
import userRouter from './Routes/User.js'
import router from './Routes/User.js';
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'
import cors from 'cors'
import paymentRouter from './Routes/payment.js'

const app=express();

app.use(bodyParser.json())

app.use(cors({
        origin:true,
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
}))

// home testing route
app.get('/',(req,res)=>res.json({message:'This is home route'}))

// user Router
app.use(`/api/user`,userRouter)

// product router 
app.use('/api/product',productRouter)

// cart router 
app.use('/api/cart',cartRouter)

// address router 
app.use('/api/address',addressRouter)

// payment Router
app.use('/api/payment',paymentRouter)

mongoose.connect(
   "mongodb+srv://shikharrajput100:RBSKekqWSYnlL3IP@cluster0.gai7u.mongodb.net/",{
        dbname:"E_commerce"}).then(() => console.log("MongoDB Connected Successfully...!")).catch((err)=>console.log(err)); 

const port=1000;
app.listen(port,()=>console.log(`Server is running on ${port}`))