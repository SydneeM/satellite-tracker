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
      transform(_doc, ret) {
        const { _id, __v, ...rest } = ret;
        return rest;
      },
    },
  }
);

const Satellite = mongoose.model('Satellite', SatelliteSchema);
export default Satellite;
