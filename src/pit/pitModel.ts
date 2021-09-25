// import mongoose from 'mongoose';
import * as mongoose from 'mongoose';
import Pit from './pitIterface';

const pitSchema = new mongoose.Schema({
  coords: Array,
  description: String,
  images: Array,
  category: Number,
});

const pitModel = mongoose.model<Pit & mongoose.Document>('Pit', pitSchema);

export default pitModel;
