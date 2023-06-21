const sqlite3 = require('sqlite3').verbose();

// Connect to the fruit_varieties table in the database
const db = new sqlite3.Database('fruitVarietiesDb.js', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the fruit_varieties table');
  }
});


// Function to get all fruit varieties from the database
function getAllFruitVarieties() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM fruit_varieties';

    db.all(query, (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Function to add a new fruit variety to the database
function addFruitVariety(name, season, location, image) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO fruit_varieties (name, season, location, image) VALUES (?, ?, ?, ?)';
    const values = [name, season, location, image];

    db.run(query, values, function (err) {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
}


// Close the database connection
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Disconnected from the fruit_varietie')
    }
    process.exit();
  });
});

module.exports = {
  getAllFruitVarieties,
  addFruitVariety, //Export the database connection for other files to access if needed
};
