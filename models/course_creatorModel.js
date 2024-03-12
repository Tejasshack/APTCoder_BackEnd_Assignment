const mongoose = require("mongoose")
const Schema = mongoose.Schema

const courseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  chapters: {
    type: Number,
    required: true,
  },
  noOfClasses: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["Personalised", "Group"],
    required: true,
  },
  learnMode: {
    type: String,
    enum: ["assisted", "self learning"],
    required: true,
  },
})

module.exports = mongoose.model("Course", courseSchema)
