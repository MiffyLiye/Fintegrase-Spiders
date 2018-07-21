const _ = require('lodash');
const moment = require('moment');

const {spider} = require('../../../utils');

const getArticle = async (uri) => {
  const $ = await spider(uri);

  const title = _.last($('td:contains("人身保险公司原保险保费收入情况表")').text().trim().split(/\s+/));

  const publishedAt = _.first($('td:contains("发布时间：")').text().replace(/\s+/g, '').match(/发布时间：\d+-\d+-\d+/)).split('：')[1];

  const anchor = $('span:contains("万元")');
  let rows = anchor.text().replace(/\t+/g,'').trim().split(/\n{6,}/);
  if (uri === 'http://bxjg.circ.gov.cn/web/site0/tab5203/info4074075.htm') {
    rows = anchor.text().replace(/\t+/g,'').trim().split(/\n{5,}/);
  }
  const data = [];
  if (rows[0].trim().split(/\n+/).length === 1) {
    data.push({name: '', original: rows[0].trim()});
  }
  let lastLine;
  let category;
  for (let i = 1; i < rows.length - 1; i++) {
    const cells = rows[i].trim().split(/\n+/);
    if (cells[0].trim() === '合计') {
      data.push({category: '', order: '--', name: cells[0].trim(), original: cells[1].trim(), investment: cells[2].trim(), linked: cells[3].trim()});
      lastLine = i;
      break;
    }
    if (/(\d+)|(-+)|(序号)/.test(cells[1])) {
      category = cells[0].trim();
      data.push({category, order: (cells[1] || '').trim(), name: (cells[2] || '').trim(), original: (cells[3] || '').trim(), investment: (cells[4] || '').trim(), linked: (cells[5] || '').trim()});
    } else {
      data.push({category, order: (cells[0] || '').trim(), name: (cells[1] || '').trim(), original: (cells[2] || '').trim(), investment: (cells[3] || '').trim(), linked: (cells[4] || '').trim()});
    }
  }
  const note = _.drop(rows, lastLine + 1).join('\n').replace(/\n+/g,'\n');
  data.push({category: '', order: '--', name: '备注', original: note.replace(/\n(单位.万元)?(万元)?$/,'')});

  return {title, uri, publishedAt, retrievedAt: moment.utc().format('YYYY-MM-DDTHH:mm:ssZ'), data};
};

module.exports = getArticle;

