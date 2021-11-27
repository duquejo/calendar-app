/**
 * 
 * Date validator
 */
 const moment =  require('moment');

const isDate = value => {

  if( ! value ) return false;

  const date = moment( value );
  
  if( ! date.isValid() ) return fase;

  return true;
};

module.exports = {
  isDate
};