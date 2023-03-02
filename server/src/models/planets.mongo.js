const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
  kepler_name: {
    type: String,
    required: true,
  }
});

//conects planetSchema with the "planet" collection
module.exports = mongoose.model('Planet', planetSchema);