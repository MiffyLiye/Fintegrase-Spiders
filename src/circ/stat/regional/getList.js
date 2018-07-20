const {spider, fixHost} = require('../../../config');

const getList = async () => {
  const $ = await spider(fixHost('/web/site0/tab5205/'));
  let links = $('a:contains("全国各地区原保险保费收入情况表")');
  let uris = [];
  for (let i = 0; i < links.length; i++) {
    uris.push(fixHost(links[i].attribs.href))
  }
  return uris;
};

module.exports = getList;

