import { Payment } from "../Models/Payment.js";
import Razorpay from "razorpay";
import dotenv from 'dotenv'

dotenv.config()

// const Razorpay = require('razorpay');
const razorpay = new Razorpay(
    { key_id: process.env.razorkeyid, 
        key_secret: process.env.razorsecret })

// checkout 
export const checkout=async(req,res)=>{
    const{amount,cartItems,userShipping,userId}=req.body

    var options = {
        amount: amount*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt:`receipt_${Date.now()}`,
      };

      const order=await razorpay.orders.create(options);
      res.json({orderId:order.id,amount:amount,cartItems,userShipping,userId,payStatus:'created'})
}

// verify , save to db 
export const verify=async(req,res)=>{
    const{orderId,paymentId,signature,amount,orderItems,userId,userShipping}=req.body

    let orderConfirm= await Payment.create({
        orderId,paymentId,signature,amount,orderItems,userId,userShipping,payStatus:'paid'
    })

    res.json({message:"payment successfull...",success:true,orderConfirm})
}

// user specific order 
export const userOrder=async(req,res)=>{
    let userId=req.user._id.toString()
    let order=await Payment.find({userId:userId}).sort({orderDate:-1})
    res.json(order)
}

// user specific order 
export const allOrders=async(req,res)=>{
    let order=await Payment.find().sort({orderDate:-1})
    res.json(order)
}

