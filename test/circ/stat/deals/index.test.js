const should = require('chai').should();
const moment = require('moment');
const getList = require('../../../../src/circ/stat/deals/getList');
const getArticle = require('../../../../src/circ/stat/deals/getArticle');

describe('Get 保险业经营情况表 uri list', function () {
  it('Should get articles uri list', async () => {
    const uris = await getList();
    uris.should.be.an('array');
    uris.length.should.be.above(0);
    uris[0].startsWith('http://bxjg.circ.gov.cn/').should.equal(true)
  });
});

describe('Get 保险业经营情况表 article', function () {
  it('Should get article with uri', async () => {
    const {title, uri, publishedAt, retrievedAt, data} = await getArticle("http://bxjg.circ.gov.cn/web/site0/tab5201/info4112312.htm");

    uri.should.equal('http://bxjg.circ.gov.cn/web/site0/tab5201/info4112312.htm');

    title.should.equal('2018年1-5月保险业经营情况表');

    publishedAt.should.equal('2018-07-05');

    moment(retrievedAt).isBefore(moment.utc().add(1, 'minute')).should.equal(true);
    moment(retrievedAt).isAfter(moment.utc().subtract(1, 'minute')).should.equal(true);

    data.should.be.an('array');
    data.length.should.be.above(0);
    data[0].name.should.equal('');
    data[0].value.should.equal('单位:万元');

    data[1].name.should.equal('原保险保费收入');
    data[1].value.should.equal('191030191.73');

    data[2].name.should.equal('1、财产险');
    data[2].value.should.equal('44747726.56');

    data[3].name.should.equal('2、人身险');
    data[3].value.should.equal('146282465.17');

    data[4].name.should.equal('（1）寿险');
    data[4].value.should.equal('117350998.35');

    data[5].name.should.equal('（2）健康险');
    data[5].value.should.equal('24487926.21');

    data[6].name.should.equal('（3）人身意外伤害险');
    data[6].value.should.equal('4443540.61');

    data[7].name.should.equal('人身保险公司保户投资款新增交费');
    data[7].value.should.equal('39762305.17');

    data[18].name.should.equal('资产总额');
    data[18].value.should.equal('1750355659.35');

    data[19].name.should.equal('备注');
  });
});
