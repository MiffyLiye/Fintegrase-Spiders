const request = require('request-promise');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const fintegraseHost = process.env.FINTEGRASE_HOST || 'http://localhost:7070';
const authorizationKey = process.env.ADMIN_AUTH_TOKEN || 'admin_auth_key';

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

const spider = async (uri) => {
  const options = {
    uri,
    encoding: null,
    transform: body => cheerio.load(iconv.decode(body, 'utf8'), {decodeEntities: false})
  };
  return await request(options);
};

const alreadyExists = async (category, uri) => {
  const options = {
    uri: `${fintegraseHost}/categories/${category}/entries`,
    method: 'GET',
    headers: {
      'Authorization': authorizationKey
    },
    qs: {
      query: JSON.stringify({uri: uri})
    },
    json: true
  };
  const res = await request(options);
  return res.data.length > 0;
};

const sync = async (getList, getArticle, category) => {
  await delay(1000);
  const uris = await getList();
  for (let i = 0; i < uris.length; i++) {
    if (await alreadyExists(category, uris[i])) {
      console.log(new Date(), 'ALREADY EXISTS', uris[i]);
      break;
    }
    await delay(1000);
    const document = await getArticle(uris[i]);
    console.log(new Date(), uris[i], document.title, document.uri);
    const options = {
      uri: `${fintegraseHost}/categories/${category}/entries`,
      method: 'POST',
      headers: {
        'Authorization': authorizationKey
      },
      body: document,
      json: true
    };
    await request(options);
  }
  console.log(new Date(), `FINISHING ${category}`);
};

module.exports = {sync, spider};
