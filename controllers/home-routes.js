const router = require('express').Router();
const Blog = require('../models/Blog');

// route for all blogs
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll();
        res.status(200).json(blogData);        
    } catch (err) {
        res.status(500).json(err);
    }
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