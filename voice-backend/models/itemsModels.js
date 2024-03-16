const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema(
    {
        categoryName: { type: String, required: true},
        subCategory: { type: String, required: true},
        item:{ type: String, required: true},
        quantity: { type: Number, default: 0},
        price:{ type: Number,required:true},
        description:{type: String,default:''}
    },
    {
        timestamps: true,
    }
)

const Item = mongoose.model('item', ItemSchema)

module.exports = Item