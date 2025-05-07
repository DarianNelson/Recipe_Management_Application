const db = require('./database');

// Just open and close the connection to test
db.close(() => {
  console.log('Database and table initialized successfully!');
});