import express from "express"
import dotenv from "dotenv"
dotenv.config({path:".env.local"})
import cors from "cors"
import Patient from "./models/patient.model.js"
import connect from "./config/connectdb.js"


const app = express()


const allowedOrigins = ['https://leviatech.vercel.app'];
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
  const { firstName, lastName, email, phone, dateOfBirth, patientType } = req.body;

  console.log(req.body); // Log the request body for debugging

  try {
    // Check if the email already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new patient record
    const newPatient = new Patient({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      patientType,
    });

    // Save the patient to the database
    const savedPatient = await newPatient.save();

    // Send success response
    res.status(201).json({ message: 'Patient details saved successfully', data: savedPatient });
  } catch (error) {
    console.error('Error saving patient:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});





  app.get('/api/patient-count', async (req, res) => {
    try {
      const opdCount = await Patient.countDocuments({ patientType: 'OPD' });
  
      const ipdCount = await Patient.countDocuments({ patientType: 'IPD' });
  
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
