const mongoose = require('mongoose');
const schema = mongoose.Schema;

const purchaseSchema = new schema(
    {
        username: { type: String, required: true },
        total:{type:Number,required:true},
        purchased_items:{type:Array,required:true}
    },
    {
        timestamps: true
    }
)

const Purchase = mongoose.model('purchase', purchaseSchema);

module.exports = Purchase;