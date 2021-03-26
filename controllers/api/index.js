const router = require('express').Router();

const blogRoutes = require('./blog-routes.js');
const userRoutes = require('./user-routes.js');

router.use('/user', userRoutes);
router.use('/blog', blogRoutes);

module.exports = router;