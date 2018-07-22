const should = require('chai').should();
const moment = require('moment');
const getList = require('../../../../src/circ/regulations/other/getList');
const getArticle = require('../../../../src/circ/regulations/other/getArticle');

describe('Get 其他法规 uri list', function () {
  it('Should get articles uri list', async () => {
    const uris = await getList();
    uris.should.be.an('array');
    uris.length.should.be.above(0);
  });
});

describe('Get 其他法规 article', function () {
  it('Should get article with uri', async () => {
    const {title, uri, publishedAt, retrievedAt, data} = await getArticle("http://bxjg.circ.gov.cn/web/site0/tab5226/info4099691.htm");

    uri.should.equal('http://bxjg.circ.gov.cn/web/site0/tab5226/info4099691.htm');

    title.should.equal('中国保监会关于中国平安财产保险股份有限公司在西藏、甘肃和新疆等地复制推广农业保险产业扶贫模式试点有关事宜的函');

    publishedAt.should.equal('2018-02-23');

    moment(retrievedAt).isBefore(moment.utc().add(1, 'minute')).should.equal(true);
    moment(retrievedAt).isAfter(moment.utc().subtract(1, 'minute')).should.equal(true);

    data.should.be.a('string');
    data.length.should.be.above(0);

    data.should.match(/^保监函〔2018〕17号/);
    data.should.match(/中国平安财产保险股份有限公司/);
    data.should.match(/你公司《关于在新疆、甘肃、西藏等13个省（自治区）复制推广“免息免担保”的产业扶贫“台江模式”的请示》（平保产发〔2018〕31号）收悉。/);
    data.should.match(/2018年2月13日$/);
  });
});
