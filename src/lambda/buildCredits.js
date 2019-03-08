const axios = require('axios');
require('dotenv').config();

exports.handler = (event, context, callback) => {
  axios.post('https://id.twitch.tv/oauth2/token?client_id=0ut7n7q1hvzr4rtl8az8q2f9uy5un0&client_secret='+process.env.twitch_secret+'&grant_type=client_credentials&scope=channel:read:subscriptions')
  .then((res) => {
    // Do something with successful response
    console.log(res);
    callback(null, {
      statusCode: 200,
      body: "success!"
    });
  })
  .catch((err) => {
    // Do something with the error
    console.log(res);
    callback(err);
  });
};