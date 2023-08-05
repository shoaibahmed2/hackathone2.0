const mongoose = require("mongoose");

const feeMonthSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Not Submitted",
  },
});

const studentSchema = new mongoose.Schema({
  studentCode: { type: Number, required: true },
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  cnic: { type: String, required: true },
  email: {
    unique: true,
    required: true,
    type: String,
    index:true
  },
  phone: { type: Number, required: true },
  class: { type: String, required: true },
  qualification:{ type: String, required: true },
  fees: {
    type: [feeMonthSchema],
    required: true,
    default: () => [
      { month: "January", status: "Not Submitted" },
      { month: "February", status: "Not Submitted" },
      { month: "March", status: "Not Submitted" },
      { month: "April", status: "Not Submitted" },
      { month: "May", status: "Not Submitted" },
      { month: "June", status: "Not Submitted" },
      { month: "July", status: "Not Submitted" },
      { month: "August", status: "Not Submitted" },
      { month: "September", status: "Not Submitted" },
      { month: "October", status: "Not Submitted" },
      { month: "November", status: "Not Submitted" },
      { month: "December", status: "Not Submitted" },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  address: { type: String, required: true },
  dob: { type: String, required: true },
});


const studentApplication = new mongoose.Schema({
  studentCode: { type: Number, required: true },
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  cnic: { type: String, required: true },
  email: {
    unique: true,
    required: true,
    type: String,
    index:true
  },
  phone: { type: Number, required: true },
  class: { type: String, required: true },
  qualification:{ type: String, required: true },
  fees: {
    type: [feeMonthSchema],
    required: true,
    default: () => [
      { month: "January", status: "Not Submitted" },
      { month: "February", status: "Not Submitted" },
      { month: "March", status: "Not Submitted" },
      { month: "April", status: "Not Submitted" },
      { month: "May", status: "Not Submitted" },
      { month: "June", status: "Not Submitted" },
      { month: "July", status: "Not Submitted" },
      { month: "August", status: "Not Submitted" },
      { month: "September", status: "Not Submitted" },
      { month: "October", status: "Not Submitted" },
      { month: "November", status: "Not Submitted" },
      { month: "December", status: "Not Submitted" },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  address: { type: String, required: true },
  dob: { type: String, required: true },
});
const studentModel = mongoose.model("students", studentSchema);
const applicationModel=mongoose.model("application",studentApplication)
module.exports = { studentModel ,applicationModel};
