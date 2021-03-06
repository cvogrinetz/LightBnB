const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */


const getUserWithEmail = email => {

  return pool
    .query(`
    SELECT id, name, email, password
    FROM users
    WHERE email = $1;`, [email])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => console.error(err.stack));
};



exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */


const getUserWithId = id => {
  
  return pool
    .query(`
    SELECT id, name, email, password
    FROM users
    WHERE id = $1;`, [id])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => console.error(err.stack));
};


exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */


const addUser = newObject => {


  return pool
    .query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [newObject.name, newObject.email, newObject.password])
    .then(res => {
      return res.rows;
    })
    .catch(err => console.error(err.stack));
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */


const getAllReservations = (guest_id, limit = 10) => {

  return pool
    .query(`
      SELECT properties.*, reservations.*, avg(rating) as average_rating
      FROM reservations
      JOIN properties ON reservations.property_id = properties.id
      JOIN property_reviews ON properties.id = property_reviews.property_id
      WHERE reservations.guest_id = $1
      AND reservations.end_date < now()::date
      GROUP BY properties.id, reservations.id
      ORDER BY reservations.start_date
      LIMIT $2;
    `, [guest_id, limit])
    .then(res => {
      console.log(res.rows);
      return res.rows;
    })
    .catch(err => console.error(err.stack));
};
  
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */



const getAllProperties = (options, limit = 10) => {
  
  const queryParams = [];

  let queryString = `
  SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id`;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += ` WHERE city LIKE $${queryParams.length} `;
  }
  
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += ` WHERE owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += ` AND cost_per_night > $${queryParams.length - 1} AND cost_per_night < $${queryParams.length} `;
  } else if (!options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += ` AND cost_per_night < $${queryParams.length} `;
  } else if (!options.maximum_price_per_night && options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += ` AND cost_per_night > $${queryParams.length} `;
  }

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += ` AND property_reviews.rating >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString  += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length}`;
  
  
  return pool.query(queryString, queryParams).then((res) => {
    return res.rows;
  });
};


exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */


const addProperty = newObject => {


  return pool
    .query(`
    INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street,city,province,post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `, [newObject.owner_id, newObject.title, newObject.description, newObject.thumbnail_photo_url, newObject.cover_photo_url, newObject.cost_per_night, newObject.street,newObject.city,newObject.province, newObject.post_code, newObject.country, newObject.parking_spaces, newObject.number_of_bathrooms, newObject.number_of_bedrooms])
    .then(res => {
      return res.rows;
    })
    .catch(err => console.error(err.stack));
};


  
exports.addProperty = addProperty;
