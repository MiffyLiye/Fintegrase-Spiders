const getList = require('./getList');
const getArticle = require('./getArticle');
const request = require('request-promise');

const fintegraseHost = 'http://localhost:7070';
const authorizationKey = '5678';

getList().then(async uris => {
  for (let i = 0; i < 2; i++) {
    const document = await getArticle(uris[i]);
    console.log(uris[i], document.title, document.uri);
    const options = {
      uri: `${fintegraseHost}/categories/circ.stat.deals/entries`,
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
