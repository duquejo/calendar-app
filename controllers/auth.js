/**
 * 
 * Auth Controllers
 * 
 */
const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { jwtTokenGenerate } = require('../helpers/jwt');

/**
 * userCreate
 */
const userCreate = async ( req, res = response ) => {
  
  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email }); 
    if( user ) return res.status(400).send({
      ok: false,
      msg: 'An user already exists with this email'
    });
    
    user = new User( req.body );

    // Password encrypt
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    await user.save();

    // Generate JWT Token
    const token = await jwtTokenGenerate( user.id, user.name );

    res.status(201).send({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

  } catch (error) {

    console.error( error );
    return res.status(500).send({
      ok: false,
      msg: 'Something failed, please contact an administrator.'
    });

  }
};

/**
 * userLogin
 */
const userLogin = async ( req, res = response ) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if( ! user ) return res.status(400).send({
      ok: false,
      msg: 'An user doesn\'t exists with this email'
    });

    // Check password
    const isValidPassword = bcrypt.compareSync( password, user.password );
    
    if( ! isValidPassword ) return res.status(400).send({
      ok: false,
      msg: 'Invalid password'
    });

    // Generate JWT Token
    const token = await jwtTokenGenerate( user.id, user.name );

    res.send({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

  } catch (error) {

    console.error( error );
    return res.status(500).send({
      ok: false,
      msg: 'Something failed, please contact an administrator.'
    });    
  }
};

/**
 * userTokenRevalidate
 */
const userTokenRevalidate = async ( req, res = response ) => {

  const { uid, name } = req;

  // Generate JWT Token
  const token = await jwtTokenGenerate( uid, name );
  
  res.json({
    ok: true,
    token,
    name,
    uid
  });
};

module.exports = {
  userCreate,
  userLogin,
  userTokenRevalidate
};