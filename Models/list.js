const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const listSchema = new Schema({
  id: ObjectId,
  heading: { type: String, required: true},
  body: {type: String, required: true}, 
  timestamp: {type: Date, default: Date.now()},
  label: { type: String, default: 'lifestyle', enum: ['worship', 'education', 'relaxation', 'work', 'lifestyle'], required: true },
//   author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
});

module.exports = mongoose.model('lists', listSchema);