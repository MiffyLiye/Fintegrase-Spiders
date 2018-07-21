const {spider} = require('../../../utils');
const {fixHost} = require('../../site');

const getList = async () => {
  const $ = await spider(fixHost('/web/site0/tab5201/'));
  let links = $('a:contains("保险业经营情况表")');
  let uris = [];
  for (let i = 0; i < links.length; i++) {
    uris.push(fixHost(links[i].attribs.href))
  }
  return uris;
};

module.exports = getList;

