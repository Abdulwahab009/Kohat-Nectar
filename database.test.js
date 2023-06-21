const chai = require('chai');
const expect = chai.expect;
const db = require('./database.js');
describe('Database Module', () => {
  it('should create fruit_varieties table', (done) => {
    db.run(`DROP TABLE IF EXISTS fruit_varieties`, (err) => {
      if (err) throw err;

      db.run(`CREATE TABLE fruit_varieties (...)`, (err) => {
        if (err) throw err;

        // Test logic and assertions
        // For example, you can query the table and check if it exists
        db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='fruit_varieties'`, (err, row) => {
          if (err) throw err;

          expect(row).to.not.be.undefined;
          expect(row.name).to.equal('fruit_varieties');

          done();
        });
      });
    });
  });

  // Add more test cases for other tables and functionality...
});

