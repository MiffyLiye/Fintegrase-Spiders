const {spider} = require('../../../utils');
const {fixHost} = require('../../site');

const getList = async (type) => {
  const $ = await spider(fixHost('/web/site0/tab5225/'));
  let section;
  let sections = $('span.Head');
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].children[0].data === type) {
      section = sections[i];
      break;
    }
  }
  let links = $(section.parent.parent).find('tr td span a');
  let uris = [];
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    uris.push(fixHost(links[i].attribs.href))
  }
  return uris;
};

module.exports = getList;

