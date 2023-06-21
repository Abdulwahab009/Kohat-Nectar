const sqlite3 = require('sqlite3').verbose();

// Connect to the diseases table in the database
const db = new sqlite3.Database('diseasesDB.js', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the diseases table');
  }
});

// Function to get all diseases from the database
function getAllDiseases() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM diseases';

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

// Function to delete a disease from the database
function deleteDisease(id) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM diseases WHERE id = ?';

    db.run(query, id, function (err) {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(this.changes);
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
      console.log('Disconnected from the diseases table');
    }
    process.exit();
  });
});

module.exports = {
  getAllDiseases,
  deleteDisease,
  db, // Export the database connection for other files to access if needed
};

