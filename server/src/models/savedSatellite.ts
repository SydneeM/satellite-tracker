import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const SavedSatelliteSchema = new Schema({
  id: Number,
  name: String,
  comments: String,
});

const SavedSatelliteModel = mongoose.model('Satellite', SavedSatelliteSchema);
export default SavedSatelliteModel;
