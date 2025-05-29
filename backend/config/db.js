import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://greatstack:87651234@cluster0.ixvdqof.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}