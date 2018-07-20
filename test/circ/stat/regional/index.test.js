const should = require('chai').should();
const moment = require('moment');
const getList = require('../../../../src/circ/stat/regional/getList');
const getArticle = require('../../../../src/circ/stat/regional/getArticle');

describe('Get 全国各地区保费收入情况表 uri list', function () {
  it('Should get articles uri list', async () => {
    const uris = await getList();
    uris.should.be.an('array');
    uris.length.should.be.above(0);
    uris[0].startsWith('http://bxjg.circ.gov.cn/').should.equal(true)
  });
});

describe('Get 全国各地区保费收入情况表 article', function () {
  it('Should get article with uri', async () => {
    const {title, uri, publishedAt, retrievedAt, data} = await getArticle("http://bxjg.circ.gov.cn/web/site0/tab5205/info4112316.htm");

    uri.should.equal('http://bxjg.circ.gov.cn/web/site0/tab5205/info4112316.htm');

    title.should.equal('2018年1-5月全国各地区原保险保费收入情况表');

    publishedAt.should.equal('2018-07-05');

    moment(retrievedAt).isBefore(moment.utc().add(1, 'minute')).should.equal(true);
    moment(retrievedAt).isAfter(moment.utc().subtract(1, 'minute')).should.equal(true);

    data.should.be.an('array');
    data.length.should.be.above(0);
    data[0].region.should.equal('');
    data[0].sum.should.equal('单位：万元');

    data[1].region.should.equal('地区');
    data[1].sum.should.equal('合计');
    data[1].property.should.equal('财产保险');
    data[1].life.should.equal('寿险');
    data[1].accidence.should.equal('意外险');
    data[1].health.should.equal('健康险');

    data[2].region.should.equal('全国合计');
    data[2].sum.should.equal('191030191.73');
    data[2].property.should.equal('44747726.56');
    data[2].life.should.equal('117350998.35');
    data[2].accidence.should.equal('4443540.61');
    data[2].health.should.equal('24487926.21');

    data[3].region.should.equal('集团、总公司本级');
    data[3].sum.should.equal('262137.01');
    data[3].property.should.equal('242521.48');
    data[3].life.should.equal('304.53');
    data[3].accidence.should.equal('15703.19');
    data[3].health.should.equal('3607.81');

    data[4].region.should.equal('北京');
    data[4].sum.should.equal('8556187.11');
    data[4].property.should.equal('1811179.13');
    data[4].life.should.equal('5028241.00');
    data[4].accidence.should.equal('256046.64');
    data[4].health.should.equal('1460720.34');

    data[39].region.should.equal('广西');
    data[39].sum.should.equal('3180817.99');
    data[39].property.should.equal('929565.71');
    data[39].life.should.equal('1781090.84');
    data[39].accidence.should.equal('92296.04');
    data[39].health.should.equal('377865.40');

    data[40].region.should.equal('备注');
    data[40].sum.startsWith('注：1、本表数据是保险业执行').should.equal(true);
  });
});
