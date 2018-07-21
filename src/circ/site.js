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

module.exports = {host, fixHost};
