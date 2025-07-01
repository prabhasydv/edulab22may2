

import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    courseTitle:{
        type:String,
        required:true
    },
    subTitle: {type:String}, 
    courseOverview: { // ✅ New field added
        type: String
    },
    description:{ type:String},
    category:{
        type:String,
        required:true
    },
    courseLevel:{
        type:String,
        enum:["Beginner", "Medium", "Advance"]
    },
    pricingOptions: [
        {
            optionName: { type: String, required: true }, // e.g., Standard, Premium
            price: { type: Number, required: true },
            batches: [
                {
                    batchName: { type: String, required: true },
                    startDate: { type: String, required: true }, // e.g., "28 May"
                    endDate: { type: String, required: true },   // e.g., "30 June"
                    timing: { type: String },                    // e.g., "10:00 AM - 12:00 PM"
                    seatsAvailable: { type: Number }
                }
            ]
        }
    ],
    courseThumbnail:{
        type:String
    },
    enrolledStudents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    lectures:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Lecture"
        }
    ],
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isPublished:{
        type:Boolean,
        default:false
    }

}, {timestamps:true});

export const Course = mongoose.model("Course", courseSchema);
