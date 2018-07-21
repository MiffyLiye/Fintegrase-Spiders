const _ = require('lodash');
const moment = require('moment');

const {spider} = require('../../../config');

const getArticle = async (uri) => {
  const $ = await spider(uri);

  const title = _.last($('td:contains("保险统计数据报告")').text().trim().split(/\s+/));

  const publishedAt = _.first($('td:contains("发布时间：")').text().replace(/\s+/g, '').match(/发布时间：\d+-\d+-\d+/)).split('：')[1];

  const anchor = $('#zoom');
  let data = anchor.text().replace(/\t+/g, '').trim().replace(/\n+/g,'\n');

  return {title, uri, publishedAt, retrievedAt: moment.utc().format('YYYY-MM-DDTHH:mm:ssZ'), data};
};

module.exports = getArticle;

