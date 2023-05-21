const mongoose = require('mongoose');
const { Schema } = mongoose;

const zoneSchema = new Schema({
  name: { type: String, required: true },
  city: { type: Schema.Types.ObjectId, ref: 'City', required: true }
});

const Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;
