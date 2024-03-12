const express = require("express")
const router = express.Router()
const courseController = require("../controller/course")
const auth = require("../middleware/Auth_middleware")

router.post("/create", courseController.createCourse)

router.put("/update/:courseId", courseController.updateCourse)

router.get(
  "/course/get/student",

  courseController.getCoursesForStudent
)

router.get(
  "/course/get/course-developer",

  auth.isCreator,
  courseController.getCoursesForCourseDeveloper
)

module.exports = router
