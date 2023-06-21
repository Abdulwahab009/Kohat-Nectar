const sqlite3 = require('sqlite3').verbose();

// Connect to the orchard_locations table in the database
const db = new sqlite3.Database('orchardLocationsDB.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the orchard_locations database.');
  }
});

// Function to get all orchard locations from the database
function getAllOrchardLocations() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM orchard_locations';

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

// Function to update an orchard location in the database
function updateOrchardLocation(id, name, latitude, longitude, fruitVariety) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE orchard_locations SET name = ?, latitude = ?, longitude = ?, fruit_variety = ? WHERE id = ?';
    const values = [name, latitude, longitude, fruitVariety, id];

    db.run(query, values, function (err) {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
}

module.exports = {
  getAllOrchardLocations,
  updateOrchardLocation,
  db,
};

// Close the database connection
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Disconnected from the orchard_locations database.');
    }
    process.exit();
  });
});

