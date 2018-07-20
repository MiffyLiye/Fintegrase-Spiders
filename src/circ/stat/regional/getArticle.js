const _ = require('lodash');
const moment = require('moment');

const {spider} = require('../../../config');

const getArticle = async (uri) => {
  const $ = await spider(uri);

  const title = _.last($('td:contains("全国各地区原保险保费收入情况表")').text().trim().split(/\s+/));

  const publishedAt = _.first($('td:contains("发布时间：")').text().replace(/\s+/g, '').match(/发布时间：\d+-\d+-\d+/)).split('：')[1];

  const anchor = $('span:contains("万元")');
  let rows = anchor.text().replace(/\t+/g, '').trim().split(/\n{6,}/);

  const data = [];
  if (rows[0].trim().split(/\n+/).length === 1) {
    data.push({region: '', sum: rows[0].trim()});
  }
  let lastLine;
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].trim().split(/\n+/);
    if (cells[0].includes('注：1、')) {
      lastLine = i;
      break;
    }
    data.push({
      region: (cells[0] || '').replace(/\s+/g, '').trim(),
      sum: (cells[1] || '').trim(),
      property: (cells[2] || '').trim(),
      life: (cells[3] || '').trim(),
      accidence: (cells[4] || '').trim(),
      health: (cells[5] || '').trim()
    });
  }
  const note = _.drop(rows, lastLine).join('\n').replace(/\n+/g, '\n');
  data.push({region: '备注', sum: note.replace(/\n(单位.万元)?(万元)?$/, '')});

  return {title, uri, publishedAt, retrievedAt: moment.utc().format('YYYY-MM-DDTHH:mm:ssZ'), data};
};

module.exports = getArticle;

