/**
 * 
 * JSON Web Tokens generation
 */
const jwt = require('jsonwebtoken');

const jwtTokenGenerate = ( uid, name ) => {
  return new Promise( ( resolve, reject ) => {

    const payload = { uid, name };

    jwt.sign( payload, process.env.SECRET_JWT_TOKEN, {
      expiresIn: '2h'
    }, ( err, token ) => {

      if( err ) {
        console.error(err);
        reject('Token creation failed');
      }  
      
      resolve( token );
    });
  });
};

module.exports = {
  jwtTokenGenerate
};