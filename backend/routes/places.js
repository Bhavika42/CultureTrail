const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Place = require('../models/Place');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// POST /api/places
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const place = new Place({ title, description, category, imageUrl });
    await place.save();
    res.json({ message: 'Place added successfully!', place });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add place' });
  }
});

// GET /api/places
router.get('/', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

module.exports = router;
