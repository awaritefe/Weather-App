request = require("postman-request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b137140f51a3356a39e2710650c6a8da&query=,${longitude},${latitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const weather_descriptions = body.current.weather_descriptions[0];
      const temperature = body.current.temperature;
      const feelslike = body.current.feelslike;

      callback(
        undefined,
        `The weather is ${weather_descriptions} and it is currently ${temperature} degrees. It feels like ${feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
