const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

/* Locations pages */
router.get('/', ctrlLocations.homelist);

// Route with dynamic locationName parameter
router.get('/location/:name', ctrlLocations.locationInfo);

// Route to load the add review page
router.get('/location/:name/review/new', ctrlLocations.addReview);

// POST route to handle review submission
router.post('/location/:name/review', ctrlLocations.doAddReview); // Changed from locationsController to ctrlLocations

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
