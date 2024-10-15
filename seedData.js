const mongoose = require('mongoose');
const Location = require('./app_server/models/location'); // Path to your model
const locations = [
  {
    name: 'FreshMart',
    address: '123 Greenway Ave, Hyderabad, Telangana 500001',
    rating: 4,
    facilities: ['Fresh Produce', 'Bakery', 'Dairy'],
    coords: { lat: 51.455041, lng: -0.9690884 },
    openingTimes: [
      { days: 'Monday - Sunday', opening: '7:00am', closing: '10:00pm', closed: false }
    ],
    reviews: [
      { author: 'Aisha Khan', rating: 5, timestamp: '2023-07-16', reviewText: 'Great selection of fresh fruits and vegetables!' },
      { author: 'Raj Patel', rating: 4, timestamp: '2023-06-16', reviewText: 'Nice store, but can get crowded during weekends.' }
    ],
    imageSrc : 'https://th.bing.com/th/id/OIP.lwFpB6gv7QGjjUg1yC6jBQHaEK?w=275&h=180&c=7&r=0&o=5&dpr=2&pid=1.7',
    gmail: 'freshmart@example.com',
    phno: '9876543210'
  },
  {
    name: 'Daily Essentials Store',
    address: '45 Market St, Hyderabad, Telangana 500002',
    rating: 4,
    facilities: ['Grocery Staples', 'Snacks', 'Beverages'],
    coords: { lat: 51.456042, lng: -0.970088 },
    openingTimes: [
      { days: 'Monday - Sunday', opening: '6:00am', closing: '11:00pm', closed: false }
    ],
    reviews: [
      { author: 'Sonia Mehta', rating: 4, timestamp: '2023-07-20', reviewText: 'Convenient place for quick shopping!' },
      { author: 'Vikram Rao', rating: 3, timestamp: '2023-06-25', reviewText: 'Good variety, but prices can be higher than expected.' }
    ],
    imageSrc : 'https://th.bing.com/th/id/OIP.2iM0emFn0WhZGn9vzbUoRQHaFz?w=246&h=193&c=7&r=0&o=5&dpr=2&pid=1.7',
    gmail: 'dailyessentials@example.com',
    phno: '9123456780'
  },
  {
    name: 'Healthy Foods Market',
    address: '78 Organic Lane, Hyderabad, Telangana 500003',
    rating: 5,
    facilities: ['Organic Products', 'Health Foods', 'Vegan Options'],
    coords: { lat: 51.457042, lng: -0.971088 },
    openingTimes: [
      { days: 'Monday - Sunday', opening: '7:00am', closing: '9:00pm', closed: false }
    ],
    reviews: [
      { author: 'Suresh Gupta', rating: 5, timestamp: '2023-08-10', reviewText: 'Best place for organic food lovers!' },
      { author: 'Priya Singh', rating: 4, timestamp: '2023-08-15', reviewText: 'Quality products but a bit pricey.' }
    ],
    imageSrc : 'https://patch.com/img/cdn/users/869885/2011/10/raw/3ccc97313c24a6c529361e7a5f9777f8.jpg',
    gmail: 'healthyfoods@example.com',
    phno: '8765432109'
  },
  {
    name: 'Local Grocery Stop',
    address: '200 City Center Rd, Hyderabad, Telangana 500004',
    rating: 3,
    facilities: ['General Groceries', 'Household Items', 'Personal Care'],
    coords: { lat: 51.458042, lng: -0.972088 },
    openingTimes: [
      { days: 'Monday - Sunday', opening: '8:00am', closing: '10:00pm', closed: false }
    ],
    reviews: [
      { author: 'Arjun Verma', rating: 3, timestamp: '2023-09-10', reviewText: 'Average store with decent options.' },
      { author: 'Neha Reddy', rating: 2, timestamp: '2023-09-12', reviewText: 'Limited variety and stock issues sometimes.' }
    ],
    imageSrc : 'https://www.alamy.com/aggregator-api/download?url=https://c8.alamy.com/comp/B5CXPJ/indian-village-shop-in-puttaparthi-india-B5CXPJ.jpg',
    gmail: 'localgrocery@example.com',
    phno: '7654321098'
  },
  {
    name: 'Veggie Delight',
    address: '34 Greenfield Blvd, Hyderabad, Telangana 500005',
    rating: 5,
    facilities: ['Vegetarian Products', 'Organic Produce', 'Local Goods'],
    coords: { lat: 51.459042, lng: -0.973088 },
    openingTimes: [
      { days: 'Monday - Saturday', opening: '7:00am', closing: '9:00pm', closed: false },
      { days: 'Sunday', opening: '8:00am', closing: '8:00pm', closed: false }
    ],
    reviews: [
      { author: 'Meera Sharma', rating: 5, timestamp: '2023-09-15', reviewText: 'Excellent variety of vegetarian options!' },
      { author: 'Nitin Kumar', rating: 4, timestamp: '2023-09-20', reviewText: 'Love the organic section and fresh local produce.' }
    ],
    imageSrc : 'https://static.bangkokpost.com/media/content/20171110/2535363.jpg',
    gmail: 'veggiedelight@example.com',
    phno: '8765432100'
  },
  {
    name: 'Tesco Express',
    address: '99 Quick Lane, Hyderabad, Telangana 500006',
    rating: 4,
    facilities: ['Fast Checkout', 'Delivery Service', 'Self-Service Kiosks'],
    coords: { lat: 51.460042, lng: -0.974088 },
    openingTimes: [
      { days: 'Monday - Sunday', opening: '24/7', closed: false }
    ],
    reviews: [
      { author: 'Rahul Desai', rating: 4, timestamp: '2023-10-01', reviewText: 'Great for late-night shopping and quick pickups.' },
      { author: 'Anjali Verma', rating: 5, timestamp: '2023-10-05', reviewText: 'Fast service and a good selection of products.' }
    ],
    imageSrc : 'https://c8.alamy.com/comp/BXBNBB/store-of-the-supermarket-chain-tesco-tesco-express-london-england-BXBNBB.jpg',
    gmail: 'supermartexpress@example.com',
    phno: '9998765432'
  }
];

  
mongoose.connect('mongodb+srv://naganiroop2005:niroop05@cluster0.t2fix.mongodb.net/grocery', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    return deleteDuplicates();
  })
  .then(() => {
    console.log('Duplicate entries deleted!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
  });

// Function to delete duplicates
async function deleteDuplicates() {
  try {
    // Find duplicate values based on the 'name' field
    const duplicates = await Location.aggregate([
      {
        $group: {
          _id: '$name', // Field to check for duplicates
          count: { $sum: 1 },
          ids: { $push: '$_id' } // Store ids of duplicates
        }
      },
      {
        $match: { count: { $gt: 1 } } // Only keep groups with more than 1 document
      }
    ]);

    // Loop through duplicates and delete all but one
    for (const duplicate of duplicates) {
      const idsToDelete = duplicate.ids.slice(1); // Keep the first instance
      await Location.deleteMany({ _id: { $in: idsToDelete } });
      console.log(`Deleted ${idsToDelete.length} duplicates of '${duplicate._id}'`);
    }
  } catch (error) {
    console.error('Error deleting duplicates:', error);
  }
}