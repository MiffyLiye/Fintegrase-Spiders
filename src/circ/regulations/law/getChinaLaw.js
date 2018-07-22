const _ = require('lodash');
const moment = require('moment');

const {spider} = require('../../../utils');

const getChinaLaw = async (uri) => {
  let $ = await spider(uri);
  const title = $('div.conTit').text();

  const publishedAt = $('td:contains("公布日期")').next().text().replace(/\s+/g, '');

  const publishedBy = $('td:contains("公布机关")').next().text().replace(/\s+/g, '');

  let anchor = $('div.con');
  let data = anchor.text().replace(/\t+/g, '').trim().replace(/\s*\n+/g, '\n').replace(/( )+/g, ' ');

  let pageCount = 1;
  const pageCountAnchor = $('span#pagecount')[0];
  if (pageCountAnchor) {
    pageCount = parseFloat(pageCountAnchor.children[0].data);
  }

  for (let i = 2; i <= pageCount; i++) {
    let nextUri = uri.replace(/(&?PageIndex=\d+)|($)/, `&PageIndex=${i}`);
    $ = await spider(nextUri);
    let anchor = $('div.con');
    data = data + '\n' + anchor.text().replace(/\t+/g, '').trim().replace(/\s*\n+/g, '\n').replace(/( )+/g, ' ').replace(/^（[^\n]+）/, '').trim();
  }

  return {title, uri, publishedAt, publishedBy, retrievedAt: moment.utc().format('YYYY-MM-DDTHH:mm:ssZ'), data};
};

module.exports = getChinaLaw;

