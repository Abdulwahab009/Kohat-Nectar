const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// Import necessary modules for database interaction
const fruitVarietiesDb = require('./fruitVarietiesDb');
const orchardLocationDb = require('./orchardLocationsDB');
const diseasesDb = require('./diseasesDB');
const registrationDb = require('./registrationDb');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Body parsing middleware
app.use(bodyParser.json());

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to Kohat Nectar: An Online Platform');
});

// Route for handling login
app.post('/login', (req, res) => {
  // Retrieve the login data from the request body
  const { email, password } = req.body;

  // Perform server-side validation
  if (!email || !password) {
    res.status(400).json({ error: 'Please provide email and password' });
    return;
  }

 // Authenticate the user
  // ... (Implement your code to authenticate the user)

  // If authentication is successful, return a success response
  res.status(200).json({ message: 'Login successful' });

  // If authentication fails, return an error response
  // res.status(401).json({ error: 'Invalid email or password' });
});


// User data Route 
app.get('/users', (req, res) => {
// connect to your SQLite database 
const db = new sqlite3.Database('database.db');
// Fetch user data from data base 
db.all('SELECT * FROM users', (err, rows) => {
if (err) {
     console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
      return;
}

    // Check if user data is available
    if (!rows || rows.length === 0) {
      res.status(404).json({ error: 'User data not found' });
      return;
    }

    // Return the user data as a response
    res.json(rows);
  });
  // Close the database connection
  db.close();
});




// Fruit varieties route
app.get('/fruit-varieties', async (req, res) => {
  try {
    // Call the appropriate function from the fruitVarietiesDb module to fetch all fruit varieties from the database
    const fruitVarieties = await fruitVarietiesDb.getAllFruitVarieties();

    // Return the retrieved fruit varieties as a response
    res.json(fruitVarieties);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Orchard locations route
app.get('/orchard-locations', async (req, res) => {
  try {
    // Call the appropriate function from the orchardLocationDb module to fetch all orchard locations from the database
    const orchardLocations = await orchardLocationDb.getAllOrchardLocations();

    // Return the retrieved orchard locations as a response
    res.json(orchardLocations);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Diseases route
app.get('/diseases', async (req, res) => {
  try {
    // Call the appropriate function from the diseasesDb module to fetch all diseases from the database
    const diseases = await diseasesDb.getAllDiseases();

    // Return the retrieved diseases as a response
    res.json(diseases);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new fruit variety
app.post('/fruit-varieties', (req, res) => {
  const { name, description } = req.body;
  fruitVarietiesDb.addFruitVariety(name, description)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

// Route to update an orchard location
app.put('/orchard-locations/:id', (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  orchardLocationDB.updateOrchardLocation(id, name, address)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

// Route to delete a disease
app.delete('/diseases/:id', (req, res) => {
  const { id } = req.params;
  diseasesDb.deleteDisease(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

// Add more routes and handlers for other API endpoints


// Body parsing middleware
app.use(express.json());

// Register endpoint
app.post('/register', (req, res) => {
  // Retrieve the registration data from the request body
  const { name, email, password } = req.body;

  // Perform server-side validation
  if (!name || !email || !password) {
    res.status(400).json({ error: 'Please fill out all fields' });
    return;
  }

  // Store the user information in the database
  // ... (Implement your code to store the data)

  // Return a success response
  res.status(200).json({ message: 'Registration successful.' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});





