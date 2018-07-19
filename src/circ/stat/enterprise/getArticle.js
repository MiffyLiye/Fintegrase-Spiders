const _ = require('lodash');
const moment = require('moment');

const {spider} = require('../../../config');

const escape = (s) => {
  let res = (s || '').trim();
  if (res === 'EMPTY') {
    res = '';
  }
  return res;
};

const getArticle = async (uri) => {
  const $ = await spider(uri);

  const title = _.last($('td:contains("保险机构企业年金等受托管理业务情况表")').text().trim().split(/\s+/));

  const publishedAt = _.first($('td:contains("发布时间：")').text().replace(/\s+/g, '').match(/发布时间：\d+-\d+-\d+/)).split('：')[1];

  const anchor = $('span:contains("万元")');
  let rows = anchor.text()
    .replace(/\t+/g,'')
    .trim()
    .replace(/\n{5}/g, 'NULL')
    .split(/NULL\n{2,}/)
    .map(line => {
      line = line.replace(/(NULL){6}/g, 'NULL EMPTY NULL EMPTY NULL EMPTY NULL EMPTY NULL EMPTY NULL');
      line = line.replace(/(NULL){5}/g, 'NULL EMPTY NULL EMPTY NULL EMPTY NULL EMPTY NULL');
      line = line.replace(/(NULL){4}/g, 'NULL EMPTY NULL EMPTY NULL EMPTY NULL');
      line = line.replace(/(NULL){3}/g, 'NULL EMPTY NULL EMPTY NULL');
      line = line.replace(/(NULL){2}/g, 'NULL EMPTY NULL');
      return line
    });
  const data = [];
  if (rows[0].trim().split(/NULL\s*(NULL)*/).length === 1) {
    data.push({name: '', trustedFee: rows[0].trim()});
  }
  let lastLine;
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].trim().split(/NULL/);
    data.push({name: escape(cells[0]), trustedFee: escape(cells[1]), investmentFee: (escape(cells[2])), otherFee: escape(cells[3]), trustedAsset: escape(cells[4]), investmentAsset: escape(cells[5]), otherAsset: escape(cells[6])});
    if (cells[0].trim() === '合计') {
      lastLine = i;
      break;
    }
  }
  let note = _.drop(rows, lastLine + 1).join('\n').replace(/\n+/g,'\n').replace(/NULL/g,'');
  if (lastLine === rows.length - 1) {
    note = '注：1、' + _.drop(rows, lastLine).join('\n').replace(/\n+/g,'\n').replace(/NULL/g,'').split(/注：1、/)[1];
  }
  data.push({name: '备注', trustedFee: note.replace(/\n(单位.万元)?(万元)?$/,'')});

  return {title, uri, publishedAt, retrievedAt: moment.utc().format('YYYY-MM-DDTHH:mm:ssZ'), data};
};

module.exports = getArticle;

