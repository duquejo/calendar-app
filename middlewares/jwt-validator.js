/**
 * 
 * JWT Token Validator
 */
const { response } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidator = ( req, res = response, next ) => {

  // X-token
  const token = req.header( 'X-Token' );
  
  if( ! token ) return res.status(401).send({
    ok: false,
    msg: 'Not token found on request'
  });

  try {

    const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_TOKEN ); // Verifying token
    req.uid = uid;
    req.name = name;
    
  } catch (error) {
    return res.status(400).send({
      ok: false,
      msg: 'Invalid token'
    });
  }

  next();
};

module.exports = {
  jwtValidator
};