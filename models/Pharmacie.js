const mongoose = require('mongoose');
const { Schema } = mongoose;


const pharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  zone: {
    
      type: Schema.Types.ObjectId, ref: 'Zone',

    required: true
  },
  garde: {
    type: String,
    enum: ["jour", "nuit"],

    required: true
  }
});

module.exports = mongoose.model('Pharmacie', pharmacySchema);