const _ = require('lodash');
const moment = require('moment');

const {spider} = require('../../../utils');

const getArticle = async (uri) => {
  const $ = await spider(uri);

  const title = $('table#tab_content tbody tr td')[0].children
    .map(c => c.data)
    .filter(d => !/Title/.test(d) && !/^\s+$/.test(d))[0]
    .trim();

  const publishedAt = _.first($('td:contains("发布时间：")').text().replace(/\s+/g, '').match(/发布时间：\d+-\d+-\d+/)).split('：')[1];

  let anchor = $('span#zoom');
  let data = anchor.text().replace(/\t+/g, '').trim().replace(/\n+/g, '\n');

  return {title, uri, publishedAt, retrievedAt: moment.utc().format('YYYY-MM-DDTHH:mm:ssZ'), data};
};

module.exports = getArticle;

