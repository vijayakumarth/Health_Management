const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  contact: String,
  symptoms: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
},{ collection: 'PatientData' });

module.exports = mongoose.model('Patiet', patientSchema);
