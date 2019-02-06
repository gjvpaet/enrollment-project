const express = require('express');

const router = express.Router();

const EnrollmentController = require('../controllers/enrollment');

const checkAuth = require('../middlewares/checkAuth');

router.get('/', checkAuth, EnrollmentController.getAll);
router.post('/', checkAuth, EnrollmentController.createEnrollment);
router.delete('/:enrollmentId', checkAuth, EnrollmentController.deleteEnrollment);

module.exports = router;