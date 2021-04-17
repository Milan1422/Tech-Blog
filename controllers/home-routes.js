const router = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

// routes for all blogs at home page
router.get('/', async (req, res) => {
    try {
      const blogData = await Blog.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      const blogs = blogData.map((blog) => blog.get({ plain: true }));
  
      res.render('homepage', { 
        blogs, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
// log in route
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/homepage");
      return;
    }
  
    res.render("login");
  });

  
// route for one blog
router.get('/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk((req.params.id));
        if(!blogData) {
            res.status(404).json({message: 'No blog with this id!'});
            return;
        }
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;