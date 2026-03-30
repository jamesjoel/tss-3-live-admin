import Order from "../models/Order.js"
import User from '../models/User.js'
import Product from '../models/Product.js'
import Razorpay from 'razorpay'
import pdf from 'pdf-creator-node'
import CreateOptions from '../helpers/CreatReceipt.js'
// import { RAZORPAY_KEY, RAZORPAY_SECRET } from "../config/config.js"

let rzpy = new Razorpay({
    key_id :process.env.RAZORPAY_KEY,
    key_secret : process.env.RAZORPAY_SECRET
})

let Payment = async(req, res)=>{
    let {amount} = req.body;
    try{
        const order = await rzpy.orders.create({
            amount : amount*100,
            currency : 'INR'
        });
        res.send({success:true, orderId : order.id})
    }catch(err){
        res.send({success:false})
    }
}

let Confirm = async(req, res)=>{
    let result_user = await User.find({_id : req.body.user_id});
    let result_product = await Product.find({_id : req.body.product_id});
    let pdfData = CreateOptions(req.body, result_user[0], result_product[0]);
    // console.log(req.body);
    // return;
    // send a mail to custer

     pdf
  .create(pdfData.document, pdfData.options)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error("-----------", error);
  });
    await Order.create(req.body);
    res.send({success:true});

}

let GetAllOrderByUserId = async(req, res)=>{
    let id = req.userobj.id;
    let result = await Order.find({user_id : id}).populate("product_id").exec();
    res.send({success: true, result});
}
let GetAllOrder = async(req, res)=>{
    
    let result = await Order.find({}).populate("user_id").populate("product_id").exec();
    res.send({success: true, result});
}



let GetAllPlacedOrder = async(req, res)=>{
    
    let result = await Order.find({status:1}).populate("user_id").populate("product_id").exec();
    res.send({success: true, result});
}
let GetAllShipped = async(req, res)=>{
    
    let result = await Order.find({status:2}).populate("user_id").populate("product_id").exec();
    res.send({success: true, result});
}
let GetAllOutForDel = async(req, res)=>{
    
    let result = await Order.find({status:3}).populate("user_id").populate("product_id").exec();
    res.send({success: true, result});
}
let GetAllDelivered = async(req, res)=>{
    
    let result = await Order.find({status:4}).populate("user_id").populate("product_id").exec();
    res.send({success: true, result});
}

let ChangeStatus = async(req, res)=>{
    let id = req.params.id;
    await Order.updateMany({_id : id}, req.body);
    res.send({success:true})
}


let GetTotalAllOrder = async(req, res)=>{
    let total = await Order.countDocuments();
    res.send({total : total})
}
let GetTotalPlacedOrder = async(req, res)=>{
    let total = await Order.countDocuments({status:1});
    res.send({total : total})
}
let GetTotalShippedOrder = async(req, res)=>{
    let total = await Order.countDocuments({status:2});
    res.send({total : total})
}
let GetTotalOutOrder = async(req, res)=>{
    let total = await Order.countDocuments({status:3});
    res.send({total : total})
}
let GetTotalDeliveredOrder = async(req, res)=>{
    let total = await Order.countDocuments({status:4});
    res.send({total : total})
}


let DeleteAll = async(req, res)=>{
    await Order.deleteMany({});
    res.send({success:true})
}


export {
    DeleteAll,
    GetTotalAllOrder,
    GetTotalDeliveredOrder,
    GetTotalOutOrder,
    GetTotalShippedOrder,
    GetTotalPlacedOrder,

    ChangeStatus, 
    Payment, 
    Confirm, 
    GetAllOrderByUserId, 
    GetAllOrder, 
    GetAllDelivered, 
    GetAllOutForDel, 
    GetAllPlacedOrder, 
    GetAllShipped}