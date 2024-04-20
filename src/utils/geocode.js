request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
    address
  )}&access_token=pk.eyJ1IjoiYXdhcml0ZWZlIiwiYSI6ImNsdXlqOWRpbzExbnAyanFybGh1ZWU2NW8ifQ.hE5NYi0Sh4XvmZVRImjdVA&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Map Box service!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location, try another search.", undefined);
    } else {
      const longitude = body.features[0].properties.coordinates.longitude;
      const latitude = body.features[0].properties.coordinates.latitude;
      const location = body.features[0].properties.full_address;

      callback(undefined, {
        longitude,
        latitude,
        location,
      });
    }
  });
};

module.exports = geocode;
