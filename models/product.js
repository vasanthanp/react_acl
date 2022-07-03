const {Schema,model} = require('mongoose')

const productSchema = new Schema({
    name:{type:String,required:true},
    description : {type:String,required:true},
    price :{type:Number,required:true},
    created_by : {type: Schema.Types.ObjectId, ref: "users"}
})
module.exports = model('product',productSchema)