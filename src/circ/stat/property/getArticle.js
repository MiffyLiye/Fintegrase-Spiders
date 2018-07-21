const _ = require('lodash');
const moment = require('moment');

const {spider} = require('../../../utils');

const getArticle = async (uri) => {
  const $ = await spider(uri);

  const title = _.last($('td:contains("财产保险公司原保险保费收入情况表")').text().trim().split(/\s+/));

  const publishedAt = _.first($('td:contains("发布时间：")').text().replace(/\s+/g, '').match(/发布时间：\d+-\d+-\d+/)).split('：')[1];

  const anchor = $('span:contains("万元")');
  const rows = anchor.text().replace(/\t+/g,'').trim().split(/\n{6,}/);
  const data = [];
  if (rows[0].trim().split(/\n+/).length === 1) {
    data.push({name: '', value: rows[0].trim()});
  }
  let lastLine;
  let category;
  for (let i = 1; i < rows.length - 1; i++) {
    const cells = rows[i].trim().split(/\n+/);
    if (cells[0].trim() === '合计') {
      data.push({category: '', order: '--', name: cells[0].trim(), value: cells[1].trim()});
      lastLine = i;
      break;
    }
    if (/(\d+)|(-+)|(序号)/.test(cells[1])) {
      category = cells[0].trim();
      data.push({category, order: cells[1] && cells[1].trim(), name: cells[2] && cells[2].trim(), value: cells[3] && cells[3].trim()});
    } else {
      data.push({category, order: cells[0] && cells[0].trim(), name: cells[1] && cells[1].trim(), value: cells[2] && cells[2].trim()});
    }
  }
  const note = _.drop(rows, lastLine + 1).join('\n').replace(/\n+/g,'\n');
  data.push({category: '', order: '--', name: '备注', value: note.replace(/\n(单位.万元)?(万元)?$/,'')});

  return {title, uri, publishedAt, retrievedAt: moment.utc().format('YYYY-MM-DDTHH:mm:ssZ'), data};
};

module.exports = getArticle;

