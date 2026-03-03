const mongoose = require('mongoose');

const healthProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    diabetes: {
      type: Boolean,
      default: false,
    },
    highBloodPressure: {
      type: Boolean,
      default: false,
    },
    highCholesterol: {
      type: Boolean,
      default: false,
    },
    allergies: {
      type: String,
      default: '',
      trim: true,
    },
    calorieGoal: {
      type: Number,
      min: 100,
      max: 10000,
      default: 2000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HealthProfile', healthProfileSchema);
