const getList = require('./getList');
const getArticle = require('./getArticle');
const request = require('request-promise');

const fintegraseHost = process.env.FINTEGRASE_HOST || 'http://localhost:7070';
const authorizationKey = process.env.ADMIN_AUTH_TOKEN || 'admin_auth_key';

getList().then(async uris => {
  for (let i = 0; i < uris.length; i++) {
    const document = await getArticle(uris[i]);
    console.log(uris[i], document.title, document.uri);
    const options = {
      uri: `${fintegraseHost}/categories/circ.stat.property/entries`,
      method: 'POST',
      headers: {
        'Authorization': authorizationKey
      },
      body: document,
      json: true
    };
    await request(options);
  }
});
