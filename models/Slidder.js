import mongoose from "mongoose";



const sliderSchema = new mongoose.Schema({
   
    title:{type:String,required:true},
    offer:{type:String,required:true},
    buttonText1:{type:String,required:true},
    buttonText2:{type:String,required:true},
    
    
    imgSrc:{type:String,required:true},
    date:{type:Number,required:true}
   
    


})

const Slidder = mongoose.models.slidder || mongoose.model('slidder',sliderSchema)

export default Slidder