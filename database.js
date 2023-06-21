const sqlite3 = require('sqlite3').verbose();

// Create a new database instance
const db = new sqlite3.Database('kohat_nectar.db',(err) =>{ // You can specify the path to your database file instead of using ':memory:' if you want to store it on disk
if (err) {
console.error('Database connection error:', err);
} else {

console.log('Connected to the database.');
}
});
// Open the database connection
db.serialize(() => {
  // Create tables if they don't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS fruit_varieties (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      season TEXT,
      location TEXT,
      image TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orchard_locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      latitude REAL,
      longitude REAL,
      fruits TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS diseases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      remedy TEXT
    )
  `);


  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      password TEXT
    )
`, (error) => {
    if (error) {
      console.error(error.message);
    } else {
      console.log('Users table created successfully.');
}
});
});
// Close the database connection when the app exits
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});


// Export the database object
module.exports = db;
