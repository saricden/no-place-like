const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

exports.handler = (event, context, callback) => {
     const config = {
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '0ut7n7q1hvzr4rtl8az8q2f9uy5un0',
        'Authorization':  'Bearer cc4yqk3a0f3r0hm9fxxamyuyq7t8kh'
      }
    };

    // NEW:
    // https://api.twitch.tv/helix/subscriptions?broadcaster_id=122717369

    // V5: https://api.twitch.tv/kraken/channels/122717369/subscriptions

    // New (now):
    axios.get('https://api.twitch.tv/helix/subscriptions?broadcaster_id=122717369', config)
    .then((response) => {

      const subs = JSON.stringify(response.data);
      fs.writeFileSync('subs.json', subs);

       callback(null, {
         statusCode: 200,
         body: JSON.stringify(response.data)
       });
      // do dis try now

      // yo thanks so much dawg
      // I was a wreck for most of that xD
      
    }).catch((error) => {
      // console.log(error.response.data);
      // I literally made this up, I have no idea what interface callback is
      // callback(null, {
      //   statusCode: 500,
      //   body: error.response.data
      // });
      console.log(error);
      callback(error.toString()); // first arg must be string or buffer
    });
    // did you deploy this code
};