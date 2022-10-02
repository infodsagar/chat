//Import mongoose
const mongoose = require('mongoose');

//Assign schema func to schema
const Schema = mongoose.Schema;

//Create schema instance and define data structure
const noteSchema = new Schema(
  {
    fileUrl: {
      type: String,
    },
    text: {
      type: String,
    },
    user_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
