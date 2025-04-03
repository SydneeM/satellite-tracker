import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const SatelliteSchema = new Schema(
  {
    id: Number,
    name: String,
    comments: String,
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

const Satellite = mongoose.model('Satellite', SatelliteSchema);
export default Satellite;
