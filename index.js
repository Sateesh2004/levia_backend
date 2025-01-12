import express from "express"
import dotenv from "dotenv"
dotenv.config({path:".env.local"})
import cors from "cors"
import Patient from "./models/patient.model.js"
import connect from "./config/connectdb.js"


const app = express()


const allowedOrigins = ['http://localhost:3000'];
app.use(cors(
    {
        origin:allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials:true,

    }
))
app.use(express.json());

const port = process.env.PORT


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/api/patients', async (req, res) => {
    const { firstName, lastName, email, phone, dateOfBirth, patientType  } = req.body;
  
    // Validate data
    // if (!firstName || !lastName || !email || !phone || !dateOfBirth) {
    //   return res.status(400).json({ message: 'All fields are required' });
    // }
  
    try {
      // Create a new patient record
      const newPatient = new Patient({
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        patientType
      });
  
      // Save the patient to the database
      const savedPatient = await newPatient.save();
  
      // Send success response
      res.status(201).json({ message: 'Patient details saved successfully', data: savedPatient });
    } catch (error) {
      console.error('Error saving patient:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });





  app.get('/api/patient-count', async (req, res) => {
    try {
      // Count the number of OPD patients
      const opdCount = await Patient.countDocuments({ patientType: 'OPD' });
  
      // Count the number of IPD patients
      const ipdCount = await Patient.countDocuments({ patientType: 'IPD' });
  
      // Return both counts
      res.status(200).json({
        opdCount,
        ipdCount
      });
    } catch (error) {
      console.error('Error fetching patient counts:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });




app.listen(port,()=>{
    connect()
    console.log(`Server running at http://localhost:${port}`)
})