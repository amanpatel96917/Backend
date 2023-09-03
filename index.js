const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// MongoDB connection

// Envirement setup
require("dotenv").config();
const urlDB = process.env.MONGO_DB;

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define a model for form data
const FormData = mongoose.model('FormData', {
    name: String,
    email: String,
    mobile:Number
});

// Middlewares
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/person",(req,resp)=>{
    resp.json({"name":"Aman"})
})

app.post('/person', async (req, res) => {
    const formData = new FormData(req.body);
    try {
        await formData.save();
        res.json({
            data: req.body
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error saving form data',
            error: error.toString()
        });
    }
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
