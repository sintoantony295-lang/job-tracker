
const mongoose =require('mongoose')

const jobSchema =new mongoose.Schema({
    company:{
        type: String,
        required:true
    },
    position:{
        type:String,
       required:true
    },
    status:{
        type:String,
         default:'Applied'
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
}
})
module.exports = mongoose.model('Job',jobSchema)