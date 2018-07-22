const {spider} = require('../../../utils');
const {fixHost} = require('../../site');

const getList = async () => {
  const $ = await spider(fixHost('/web/site0/tab5223/'));
  let links = $('tr td span a');
  let uris = [];
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    uris.push(fixHost(links[i].attribs.href))
  }
  return uris;
};

module.exports = getList;

