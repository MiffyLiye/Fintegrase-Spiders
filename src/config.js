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

module.exports = {host, fixHost, fintegraseHost, authorizationKey, spider};
