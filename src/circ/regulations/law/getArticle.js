const _ = require('lodash');
const moment = require('moment');
const getChinaLaw = require('./getChinaLaw');

const {spider} = require('../../../utils');

const getArticle = async (uri) => {
  const $ = await spider(uri);

  if (uri.startsWith('http://bxjg.circ.gov.cn/')) {
    const title = $('table#tab_content tbody tr td')[0].children
      .map(c => c.data)
      .filter(d => /法/.test(d))[0]
      .trim();

    const publishedAt = _.first($('td:contains("发布时间：")').text().replace(/\s+/g, '').match(/发布时间：\d+-\d+-\d+/)).split('：')[1];

    let anchor = $('span#zoom');
    let data = anchor.text().replace(/\t+/g, '').trim().replace(/\n+/g, '\n');

    const publishedBy = data.split(/\n/)[0].trim();
    data = _.drop(data.split(/\r?\n+/), 1).join('\n');

    if (uri === 'http://bxjg.circ.gov.cn/web/site0/tab5222/info94860.htm') {
      anchor = anchor.next().next()
      data = anchor.text().replace(/\t+/g, '').trim().replace(/\n+/g, '\n');
    }

    return {title, uri, publishedAt, publishedBy, retrievedAt: moment.utc().format('YYYY-MM-DDTHH:mm:ssZ'), data};
  } else if (uri.startsWith('http://search.chinalaw.gov.cn/')) {
    return await getChinaLaw(uri);
  } else {
    throw new Error('Uri not recognized');
  }
};

module.exports = getArticle;

