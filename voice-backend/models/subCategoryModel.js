const mongoose = require('mongoose')

const subcategorySchema = new mongoose.Schema(
    {
        categoryName: { type: String, required: true },
        subCategory:{type:String,required:true}
    },
    {
        timestamps: true,
    }
)

const subCategory = mongoose.model('subCategory', subcategorySchema)

module.exports = subCategory