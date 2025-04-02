import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const SatelliteSchema = new Schema({
  id: Number,
  name: String,
  comments: String,
});

const Satellite = mongoose.model('Satellite', SatelliteSchema);
export default Satellite;
