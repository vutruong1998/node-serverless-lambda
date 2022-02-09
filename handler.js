'use strict';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Welcome to server!',
        input: event,
      },
      null,
      2
    ),
  };
};
