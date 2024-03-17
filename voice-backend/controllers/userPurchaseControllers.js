const Purchase = require('../models/purchaseModel')
const getPurchases = async(req,res)=>{
    try{
        const doc = await Purchase.find({username:req.user.username})
        if(!doc){
            return res.status(403).json({error:true,message:'No Purchase History'})
        }
        return res.status(200).json({error:false,message:'Purchase History',data:doc})
    }catch(err){
        return res.status(409).json({ error: true, message: err.message });
    }   
}

const newPurchase = async (req,res) =>{
    try{
        const {items,total} = req.body;
        if(items.length === 0){
            return res.status(401).json({error:true,message:'No element found to purchase'})
        }
        const newPurchase = new Purchase({
            purchased_items:items,
            total,
            username:req.user.username,
        })
        const doc = await newPurchase.save()
        return res.status(200).json({ error: false, message: 'purchase successful',data:doc })
    }catch(err){
        return res.status(409).json({ error: true, message: err.message });
    }
}

module.exports = { newPurchase, getPurchases }