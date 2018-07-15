const request = require('request-promise');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const _ = require('lodash');

const host = 'http://bxjg.circ.gov.cn';
const fixHost = (uri) => {
  if (uri.startsWith('http')) {
    return uri;
  } else if (uri.startsWith('/')) {
    return host + uri;
  } else {
    return `${host}/${uri}`;
  }
};

const spider = async (uri) => {
  const options = {
    uri,
    encoding: null,
    transform: body => cheerio.load(iconv.decode(body, 'utf8'), {decodeEntities: false})
  };
  return await request(options);
};

const getArticle = async (uri) => {
  const $ = await spider(uri);

  const title = _.last($('td:contains("保险业经营情况表")').text().trim().split(/\s+/));

  const publishedAt = _.first($('td:contains("发布时间：")').text().replace(/\s+/g, '').match(/发布时间：\d+-\d+-\d+/)).split('：')[1];

  const anchor = $('span:contains("万元")');
  const rows = anchor.text().replace(/\t+/g,'').trim().split(/\n{6,}/);
  const data = [];
  if (rows[0].trim().split(/\n+/).length === 1) {
    data.push({name: '', value: rows[0].trim()});
  }
  let lastLine;
  for (let i = 1; i < rows.length - 1; i++) {
    const cells = rows[i].trim().split(/\n+/);
    data.push({name: cells[0], value: cells[1]})
    if (cells[0] === '资产总额') {
      lastLine = i;
      break;
    }
  }
  const note = _.drop(rows, lastLine + 1).join('\n').replace(/\n+/g,'\n');
  data.push({name: '备注', value: note.replace(/\n(单位:万元)?(万元)?$/,'')});

  return {title, uri, publishedAt, data};
};

module.exports = getArticle;

