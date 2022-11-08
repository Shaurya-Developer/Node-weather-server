const request = require("request");
const forecast = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=118d45441284b4ffd91e55f4757b995c&query=${address}&units=f`;
  request({ url: url, json: true }, (err, res) => {
    if (err) callback("Internet not found", undefined);
    else if (res.body.success === false)
      callback({ error: "Address not found" }, undefined);
    else {
      console.log(res.body);
      callback(undefined, {
        forecast: res.body.current.weather_descriptions[0],
        temp: res.body.current.temperature,
        country: res.body.location.country,
        location: res.body.location.name,
        state: res.body.location.region,
        humidity: res.body.current.humidity,
      });
    }
  });
};

module.exports = forecast;
