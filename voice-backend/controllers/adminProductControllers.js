const Category = require('../models/categoryModel')
const subCategory = require('../models/subCategoryModel')
const Item = require('../models/itemsModels')
const addCategory = async (req,res) =>{
    try{
        const cate = req.body.categoryName.trim().toLowerCase();
        const doc = await Category.findOne({ categoryName:cate})
        if(doc){
            return res.status(409).json({error:true,message:'Category already exists'})
        }
        const category = new Category({ categoryName:cate})
        await category.save()

        return res.status(201).json({error:false,message:'Category added'})
    } catch(err){
        return res.status(500).json({error:true,message:err.message})
    }   
}

const getCategory = async(req,res) =>{
    try{
        const doc = await Category.find({})
        return res.status(200).json({error:false,message:'All Categories',data:doc})
    } catch(err){
        return res.status(500).json({ error: true, message: err.message })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const cate = req.query.categoryName.trim().toLowerCase()
        const doc = await Category.findOne({ categoryName: cate })
        if (!doc) {
            return res.status(409).json({ error: true, message: 'Category don\'t exists' })
        }
        
        await Category.deleteOne({ categoryName: cate })
        return res.status(201).json({ error: false, message: 'Category delete', data: doc })
    } catch (err) {
        return res.status(500).json({ error: true, message: err.message })
    }
}


const addSubCategory =async (req, res) => {
    try {

        const cate = req.body.categoryName.trim().toLowerCase()
        const subCate = req.body.subCategory.trim().toLowerCase()
        const doc = await Category.findOne({ categoryName: cate })
        if (!doc) {
            return res.status(409).json({ error: true, message: 'Category don\'t exists' })
        }
        const doc2 = await subCategory.findOne({ categoryName: cate, subCategory:subCate})
        if (doc2){    
            return res.status(409).json({ error: true, message: 'subCategory already exists' })
        }
        const newsubCategory = new subCategory({ categoryName: cate, subCategory:subCate })
        await newsubCategory.save()
        return res.status(201).json({ error: false, message: 'sub Category added' })

    } catch (err) {
        return res.status(500).json({ error: true, message: err.message })
    }
}

const getSubCategory = async (req,res) =>{
    try {   
        const doc = await subCategory.find({})
        return res.status(200).json({ error: false, message: 'All Categories', data: doc })
    } catch (err) {
        return res.status(500).json({ error: true, message: err.message })
    }
}

const deleteSubCategory = async (req,res) =>{
    try {
        const cate = req.query.categoryName.trim().toLowerCase()
        const subCate = req.query.subCategory.trim().toLowerCase()
        const doc = await Category.findOne({ categoryName: cate })
        if (!doc) {
            return res.status(409).json({ error: true, message: 'Category don\'t exists' })
        }
        const doc2 = await subCategory.findOne({ categoryName: cate, subCategory: subCate })
        if (!doc2) {
            return res.status(409).json({ error: true, message: 'subCategory don\'t exists' })
        }
        await subCategory.deleteOne({ categoryName: cate, subCategory: subCate})
        return res.status(201).json({ error: false, message: 'sub Category delete',data:doc2 })
    } catch (err) {
        return res.status(500).json({ error: true, message: err.message })
    }
}

const addItems = async (req,res) =>{
    try{
        const cate = req.body.categoryName.trim().toLowerCase()
        const subCate = req.body.subCategory.trim().toLowerCase()
        const item = req.body.item.trim().toLowerCase()
        const doc = await Category.findOne({ categoryName: cate })
        if (!doc) {
            return res.status(409).json({ error: true, message: 'Category don\'t exists' })
        }
        const doc2 = await subCategory.findOne({ categoryName: cate, subCategory: subCate })
        if (!doc2) {
            return res.status(409).json({ error: true, message: 'subCategory doesn\'t exists' })
        }
        const doc3 = await Item.findOne({ categoryName: cate, subCategory: subCate, item: item })
        if (doc3) {
            return res.status(409).json({ error: true, message: 'item already exists' })
        }
        const newItem = new Item({ categoryName: cate, subCategory: subCate, item: item, price: req.body.price, quantity: req.body.quantity, description: req.body.description })
        await newItem.save()
        return res.status(201).json({ error: false, message: 'sub Category added', data: newItem })
    } catch(err){
        return res.status(500).json({ error: true, message: err.message })
    }
   
}

const getItems = async (req, res) => {
    try{
        const doc3 = await Item.find({})
        return res.status(200).json({error:false,message:'items in the store',data:doc3})
    }catch(err){
        return res.status(500).json({ error: true, message: err.message })
    }
}

const updateItems = async (req, res) => {
    try{
        const cate = req.body.categoryName.trim().toLowerCase()
        const subCate = req.body.subCategory.trim().toLowerCase()
        const item = req.body.item.trim().toLowerCase()

        const doc = await Category.findOne({ categoryName: cate })
        if (!doc) {
            return res.status(409).json({ error: true, message: 'Category don\'t exists' })
        }
        const doc2 = await subCategory.findOne({ categoryName: cate, subCategory: subCate })
        if (!doc2) {
            return res.status(409).json({ error: true, message: 'subCategory doesn\'t exists' })
        }
        const doc3 = await Item.findOne({ categoryName: cate, subCategory: subCate, item: item })
        if (!doc3) {
            return res.status(409).json({ error: true, message: 'item doesn\'t exists' })
        }
        const doc4 = await Item.updateOne({categoryName: cate, subCategory: subCate, item:item},req.body,{upsert:true},{new:true})
        return res.status(200).json({error:false,message:'Item successfully updated',data:doc4})
        
    } catch(err){
        return res.status(500).json({ error: true, message: err.message })
    }
}

const deleteItems = async (req, res) => {
    try{
        const cate = req.query.categoryName.trim().toLowerCase()
        const subCate = req.query.subCategory.trim().toLowerCase()
        const item = req.query.item.trim().toLowerCase()
        const doc = await Category.findOne({ categoryName: cate })
        if (!doc) {
            return res.status(409).json({ error: true, message: 'Category don\'t exists' })
        }
        const doc2 = await subCategory.findOne({ categoryName: cate, subCategory: subCate })
        if (!doc2) {
            return res.status(409).json({ error: true, message: 'subCategory doesn\'t exists' })
        }
        const doc3 = await Item.findOne({ categoryName: cate, subCategory: subCate, item: item })
        if (!doc3) {
            return res.status(409).json({ error: true, message: 'item doesn\'t exists' })
        }
        await Item.deleteOne({ categoryName: cate, subCategory: subCate,item:item})
        return res.status(203).json({error:false,message:'successfully deleted',data:doc3})
    }catch(err){
        return res.status(500).json({ error: true, message: err.message })
    }
}


module.exports ={
    addCategory, getCategory, addSubCategory, getSubCategory, deleteSubCategory, deleteCategory, addItems, getItems, updateItems, deleteItems
}