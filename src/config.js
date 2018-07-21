const request = require('request-promise');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const host = 'http://bxjg.circ.gov.cn';
const fixHost = (uri) => {
  if (uri.startsWith('http')) {
    return uri;
  } else if (uri.startsWith('/')) {
    return host + uri;
  } else {
    return `${host}/${uri}`;
  }
};
const fintegraseHost = process.env.FINTEGRASE_HOST || 'http://localhost:7070';
const authorizationKey = process.env.ADMIN_AUTH_TOKEN || 'admin_auth_key';

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
  getList().then(async uris => {
    for (let i = 0; i < uris.length; i++) {
      if (alreadyExists(category, uris[i])) {
        console.log('ALREADY EXISTS', uris[i]);
        break;
      }
      const document = await getArticle(uris[i]);
      console.log(uris[i], document.title, document.uri);
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
    console.log('FINISHING');
  });
};

module.exports = {host, fixHost, sync, fintegraseHost, authorizationKey, spider};
