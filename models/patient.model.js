import mongoose from "mongoose";
const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
      },
      phone: {
        type: String,
        required: true
      },
      dateOfBirth: {
        type: Date,
        required: true
      },
      patientType: {
        type: String,
        required: true,
        enum: ['OPD', 'IPD'],
      },
      
      
      createdAt: {
        type: Date,
        default: Date.now
      } 
})
const Patient = mongoose.model("Patient",patientSchema)
export default Patient