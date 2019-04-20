const axios = require('axios');
const admin = require('firebase-admin');
const serviceAccount = require('../firebaseServiceAccountKey.json');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.firebase_databaseURL
});

const db = admin.firestore();

// DO NOT CONSOLE LOG YOUR DB ON A LIVESTREAM KIRK. THIS REVEALS YOUR SUPER TOP SECRET CREDS.
// console.log(db);

exports.handler = (event, context, callback) => {
    const config = {
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '...',
        'Authorization':  'Bearer ...'
      }
    };

    // NEW:
    // https://api.twitch.tv/helix/subscriptions?broadcaster_id=122717369

    // V5: https://api.twitch.tv/kraken/channels/122717369/subscriptions

    // New (now):
    axios.get('https://api.twitch.tv/helix/subscriptions?broadcaster_id=122717369', config)
    .then((response) => {

      const subs = JSON.stringify(response.data);

      db.collection('test').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
        
        callback(null, {
          statusCode: 200,
          body: subs
        });
      }).catch((error) => {
        console.log('oooooh nuuuuuuuu!!! T_T', error);
      });
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