/**
 * 
 * User Routes / Auth Routes
 * @param {host} + /api/auth
 * 
 */
const { Router }     = require('express');
const { check }      = require('express-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { userCreate, userLogin, userTokenRevalidate } = require('../controllers/auth');
const { jwtValidator } = require('../middlewares/jwt-validator');

const router  = Router();

/**
 * 
 * User Create
 */
router.post(
  '/new', 
  [ 
    check( 'name', 'Name is required' ).not().isEmpty(),
    check( 'email', 'Email is required' ).isEmail(),
    check( 'password', 'Password must have 6 characters or more' ).isLength({ min: 6 }),
    fieldsValidator
  ], 
  userCreate // Controller
);

/**
 * 
 * User Login
 */
router.post(
  '/', 
  [
    check( 'email', 'Email is required' ).isEmail(),
    check( 'password', 'Password must have 6 characters or more').isLength({ min: 6 }),
    fieldsValidator
  ],
  userLogin // Controller
);

/**
 * 
 * User Token Renew
 */
router.get('/renew', jwtValidator, userTokenRevalidate );

module.exports = router;