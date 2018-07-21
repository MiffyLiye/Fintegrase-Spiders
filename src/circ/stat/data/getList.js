const {spider} = require('../../../utils');
const {fixHost} = require('../../site');

const getList = async () => {
  const $ = await spider(fixHost('/web/site0/tab5257/'));
  let links = $('a:contains("保险统计数据报告")');
  let uris = [];
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if (link.children[0].data && /\d+/.test(link.children[0].data)) {
      uris.push(fixHost(links[i].attribs.href))
    }
  }
  return uris;
};

module.exports = getList;

