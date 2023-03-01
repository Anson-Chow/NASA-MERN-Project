// const mongoose = require("mongoose");

// //Making our mongoose Schema based on our launches model
// const launchesSchema = new mongoose.Schema({
//   flightNumber: {
//     type: Number, //This ensures that if we try to use a type that is not a number (e.g., String), our database will not save it
//     required: true,
//     // default: 100,
//     // min: 100,
//     // max: 999,
//   },
//   launchDate: {
//     type: Date,
//     required: true,
//   },
//   mission: {
//     type: String,
//     required: true,
//   },
//   rocket: {
//     type: String,
//     required: true,
//   },
//   target: {
//     type: String,
//     required: true,
//   },
//   customers: [ String ], //array of strings

//   upcoming: {
//     type: Boolean,
//     require: true,
//   },
//   success: {
//     type: Boolean,
//     required: true,
//     default: true,
//   },
// });

const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
  },
  customers: [ String ],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});
