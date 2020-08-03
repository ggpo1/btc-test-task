const fetch = require('node-fetch');
const crypto = require('crypto');
const qs = require('qs');

const apiKey = 'JYmoP4mucWnFaC1m_FGN1uJY';
const apiSecret = 'vDr9PuvCe3R5LkGHg9IjJI6fDPyTBkNnnZ8CfMJJZWosQT0o';

function makeRequest(verb, endpoint, data = {}) {
  const apiRoot = '/api/v1/';

  const expires = Math.round(new Date().getTime() / 1000) + 60; // 1 min in the future

  let query = ''

  const signature = crypto.createHmac('sha256', apiSecret)
    .update(verb + apiRoot + 'orderBook/L2' + '?symbol=xbt&depth=25' + expires).digest('hex');

  const headers = {
    'content-type': 'application/json',
    'accept': 'application/json',
    // This example uses the 'expires' scheme. You can also use the 'nonce' scheme. See
    // https://www.bitmex.com/app/apiKeysUsage for more details.
    'api-expires': expires,
    'api-key': apiKey,
    'api-signature': signature,
  };

  const requestOptions = {
    method: verb,
    headers,
  };

  return fetch('https://www.bitmex.com/api/v1/orderBook/L2?symbol=xbt&depth=25', requestOptions).then(response => response.json()).then(
    response => {
      if ('error' in response) throw new Error(response.error.message);
      return response;
    },
    error => console.error('Network error', error),
  );
}

module.exports.makeRequest = makeRequest;

