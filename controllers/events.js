/**
 * 
 * Event Controllers
 * 
 */
const { request, response } = require('express');
const Event = require('../models/Event');

const getEvents = async ( req = request, res = response ) => {

  try {
    
    const events = await Event.find().populate( 'user', 'name' );

    res.send({
      ok: true,
      events
    });

  } catch (error) {
    console.error( error );
    return res.status(500).send({
      ok: false,
      msg: 'Something failed, please contact an administrator'
    });
  }
};

const createEvent = async ( req = request, res = response ) => {
  
  try {
    
    const event = new Event( req.body );

    event.user = req.uid;

    await event.save();

    res.status(201).send({
      ok: true,
      event
    });
    
  } catch (error) {
    console.error( error );
    return res.status(500).send({
      ok: false,
      msg: 'Something failed, please contact an administrator'
    });
  }
};

const updateEvent = async ( req = request, res = response ) => {

  const eventId = req.params.id;
  const { uid } = req;

  try {
    
    const event = await Event.findById( eventId );

    if( ! event ) return res.status(404).send({
      ok: false,
      msg: 'Event not found'
    });

    if( event.user.toString() !== uid ) return res.status(401).send({
      ok: false,
      msg: 'You have not permissions to edit this event'
    });

    const newEvent = {
      ...req.body,
      user: uid
    };

    const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true });

    res.send({
      ok: true,
      event: updatedEvent
    });

  } catch (error) {
    console.error( error );
    return res.status(500).send({
      ok: false,
      msg: 'Something failed, please contact an administrator'
    });
  }
};

const deleteEvent = async ( req = request, res = response ) => {

  const eventId = req.params.id;
  const { uid } = req;

  try {
    
    const event = await Event.findById( eventId );

    if( ! event ) return res.status(404).send({
      ok: false,
      msg: 'Event not found'
    });

    if( event.user.toString() !== uid ) return res.status(401).send({
      ok: false,
      msg: 'You have not permissions to delete this event'
    });

    await Event.findByIdAndDelete( eventId );

    res.send({ ok: true });

  } catch (error) {
    console.error( error );
    return res.status(500).send({
      ok: false,
      msg: 'Something failed, please contact an administrator'
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
};