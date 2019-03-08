const axios = require('axios');

exports.handler = (event, context, callback) => {
  axios.get('https://jsonplaceholder.typicode.com/todos/1')
  .then((res) => {
    // Do something with successful response
    callback(null, {
      statusCode: 200,
      body: res.data.title
    });
  })
  .catch((err) => {
    // Do something with the error
    callback(err);
  });
};