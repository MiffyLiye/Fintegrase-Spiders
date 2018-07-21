const should = require('chai').should();
const moment = require('moment');
const getList = require('../../../../src/circ/stat/data/getList');
const getArticle = require('../../../../src/circ/stat/data/getArticle');

describe('Get 保险统计数据报告 uri list', function () {
  it('Should get articles uri list', async () => {
    const uris = await getList();
    uris.should.be.an('array');
    uris.length.should.be.above(0);
    uris[0].startsWith('http://bxjg.circ.gov.cn/').should.equal(true)
  });
});

describe('Get 保险统计数据报告 article', function () {
  it('Should get article with uri', async () => {
    const {title, uri, publishedAt, retrievedAt, data} = await getArticle("http://bxjg.circ.gov.cn/web/site0/tab5257/info4112307.htm");

    uri.should.equal('http://bxjg.circ.gov.cn/web/site0/tab5257/info4112307.htm');

    title.should.equal('2018年1-5月保险统计数据报告');

    publishedAt.should.equal('2018-07-05');

    moment(retrievedAt).isBefore(moment.utc().add(1, 'minute')).should.equal(true);
    moment(retrievedAt).isAfter(moment.utc().subtract(1, 'minute')).should.equal(true);

    data.should.be.a('string');
    data.length.should.be.above(0);

    data.should.match(/^一、原保险保费收入19103.02亿元，同比下降5.86%/);
    data.should.match(/产险公司原保险保费收入4961.28亿元，同比增长15.26%；寿险公司原保险保费收入14141.71亿元\[1\]，同比下降11.54%。/);
    data.should.match(/六、净资产20474.33亿元，较年初增长8.65%。/);
    data.should.match(/\[1\]不包括中华联合控股寿险业务。$/);
  });
});
