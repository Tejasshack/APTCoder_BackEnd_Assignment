**Key Features**


User authentication using JWT tokens.
Role-based access control (RBAC) to restrict certain routes.
CRUD operations for courses.
Integration with MongoDB for data storage.
Technologies Used:

Node.js for server-side development.

Express.js for building the RESTful API.

MongoDB as the database for storing course information.

JWT for user authentication and authorization.

Mongoose as an ODM for MongoDB.

Endpoints and Routes:




/api/course/create: Create a new course.

/api/course/update/:courseId: Update an existing course.

/api/course/get/student: Get courses for students.

/api/course/get/course-developer: Get courses for course developers.
