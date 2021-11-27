/**
 * 
 * Events Routes
 * @param {host} + /api/events
 * 
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { getEvents, updateEvent, createEvent, deleteEvent } = require('../controllers/events');


/**
 * Define Middleware in all routes
 */
const router = Router();
router.use( jwtValidator );

/**
 * Get all events 
 */
router.get('/', getEvents );

/**
 * Create event 
 */
router.post(
  '/', 
  [
    check( 'title', 'Title is required').not().isEmpty(),
    check( 'start', 'Start date is required').custom( isDate ),
    check( 'end', 'End date is required').custom( isDate ),
    fieldsValidator
  ],
  createEvent
);

/**
 * Update event
 */
router.put(
  '/:id', 
  [
    check( 'title', 'Title is required').not().isEmpty(),
    check( 'start', 'Start date is required').custom( isDate ),
    check( 'end', 'End date is required').custom( isDate ),
    fieldsValidator
  ],
  updateEvent
);

/**
 * Remove event
 */
router.delete( '/:id', deleteEvent );

module.exports = router;