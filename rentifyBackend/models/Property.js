const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    location:{ 
        type: String, 
        required: true 
    },
    area:{ 
        type: String, 
        required: true 
    },
    bedrooms:{ 
        type: Number, 
        required: true 
    },
    bathrooms:{
        type: Number, 
        required: true 
    },
    nearbyHospitals:{ 
        type: [String],
        trim: true 
    },
    nearbyColleges:{ 
        type: [String],
        trim: true 
    },
    likes: { 
        type: Number, 
        default: 0 
    },
},
{timestamps:true});

module.exports = mongoose.model("Property", propertySchema);