const Location = require('../models/location'); // Import the model

// Home page listing locations
const homelist = async (req, res) => {
  try {
    const locations = await Location.find(); // No callback, using await
    res.render('locations-list', {
      title: 'Online Groceries',
      pageHeader: {
        title: 'Online Groceries',
        strapline: 'Hunt your grocery needs!',
      },
      sidebar: "Searching for a grocery store with great products? Our Grocery Locator helps you find the best spots for all your grocery needs...",
      locations: locations // Use data from MongoDB
    });
  } catch (err) {
    res.status(500).send('Error retrieving locations');
  }
};
// Location detail page
const locationInfo = async (req, res) => {
  const locationName = req.params.name.replace(/-/g, ' ');
  try {
    const location = await Location.findOne({ name: new RegExp(`^${locationName}$`, 'i') });
    if (!location) {
      return res.status(404).send('Location not found');
    }
    res.render('location-info', {
      title: location.name,
      pageHeader: { title: location.name },
      sidebar: {
        context: `${location.name} is part of Onile Groceries because it offers a variety of products including grocery essentials.`,
        callToAction: `To Contact Us:\nGmail: ${location.gmail}\nPhone: ${location.phno}`
      },
      location: location
    });
  } catch (err) {
    res.status(500).send('Error retrieving location');
  }
};

// Add Review Form Page (GET Request)
const addReview = async (req, res) => {
  const locationName = req.params.name.replace(/-/g, ' '); // Get the location name from the URL
  try {
    const location = await Location.findOne({ name: new RegExp(`^${locationName}$`, 'i') }); // Find location by name
    if (!location) {
      return res.status(404).send('Location not found'); // Handle location not found
    }

    // Render the add review page
    res.render('location-review-form', {
      title: `Add Review for ${location.name}`,
      pageHeader: { title: `Review ${location.name}` },
      location: location // Pass the location to the view for context
    });
  } catch (err) {
    res.status(500).send('Error retrieving location'); // Handle errors during location retrieval
  }
};

// Handle Review Submission (POST Request)
const doAddReview = async (req, res) => {
  const locationName = req.params.name.replace(/-/g, ' ');
  try {
    const location = await Location.findOne({ name: new RegExp(`^${locationName}$`, 'i') });

    if (!location) {
      return res.status(404).send('Location not found');
    }

    // Create new review object
    const newReview = {
      author: req.body.name,
      rating: parseInt(req.body.rating, 10),
      timestamp: new Date(),
      reviewText: req.body.review
    };

    // Add the new review to the location's reviews array
    location.reviews.push(newReview);

    // Save the updated location document to MongoDB
    await location.save();

    // Redirect back to the location info page
    res.redirect(`/location/${req.params.name}`);
  } catch (err) {
    res.status(500).send('Error adding review');
  }
};

module.exports = {
  homelist,
  locationInfo,
  addReview,
  doAddReview // Export the new function
};
