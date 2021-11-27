/**
 * 
 * Database config
 * MongoDB - MongooseODM
 * 
 */
const mongoose = require('mongoose');

const dbConnection = async () => {
  try {

    await mongoose.connect( process.env.DB_CONN );

  } catch (error) {
    console.error(error); 
    throw new Error('Error at DB Initialization'); 
  }
};

module.exports = {
  dbConnection
};