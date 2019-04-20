const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.updateTwitchSubs = functions.https.onRequest((req, res) => {

  const saricdenTwitchID = 122717369;
  const db = admin.firestore();
  const twitchCode = req.query.code;

  axios.post(`https://id.twitch.tv/oauth2/token?client_id=1g00dogpvxogbnmqwv88k72y529jtj&client_secret=${functions.config().twitch.secret}&code=${twitchCode}&grant_type=authorization_code&redirect_uri=https://us-central1-no-place-like-445c8.cloudfunctions.net/updateTwitchSubs`).then((twitchRes) => {

    const {access_token} = twitchRes.data;

    const config = {
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '1g00dogpvxogbnmqwv88k72y529jtj',
        'Authorization':  'Bearer '+access_token
      }
    };

    axios.get('https://api.twitch.tv/helix/subscriptions?broadcaster_id=122717369', config)
    .then((subRes) => {

      db.collection('twitchSubs').add({
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        twitchData: subRes.data
      }).then((docRef) => {
        const docData = docRef.data();
        const {data} = docData.twitchData;

        let html = `
        <!doctype html>
        <html>
          <head>
            <title>WELCOME TO AWESOMENESS!</title>
          </head>
          <body>
          <h1>Welcome New Subscribers!</h1>
          <ul>
          `;

        data.forEach((sub) => {
          const {user_name} = sub;
          html += `<li>${user_name}</li>`;
        });

        html += `
          </ul>
          </body>
        </html>
      `;
        res.send(html);
      }).catch((error) => {
        console.log('pyramids R bad Kirk.', error);
      });
      
    }).catch((error) => {
      console.log('inner nuuuuuuuuuuuuuuu', error);
    })

  }).catch((error) => {
    console.log('nuuuuuuuuuuuuuuuuuuuuuuuu', error);
  });

  // db.collection('test').get().then((querySnapshot) => {

  //   querySnapshot.forEach((doc) => {
  //     test[doc.id] = doc.data();
  //   });

  //   res.send(test);

  // }).catch((error) => {
  //   console.log("oh deeeeeeeeeer.", error);
  // });

});
