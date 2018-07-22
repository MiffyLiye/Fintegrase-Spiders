const should = require('chai').should();
const moment = require('moment');
const getList = require('../../../../src/circ/regulations/administration/getList');
const getArticle = require('../../../../src/circ/regulations/administration/getArticle');

describe('Get 行政法规 uri list', function () {
  it('Should get articles uri list', async () => {
    const uris = await getList();
    uris.should.be.an('array');
    uris.length.should.be.above(0);
  });
});

describe('Get 行政法规 article', function () {
  it('Should get 农业保险条例 with uri', async () => {
    const {title, uri, publishedAt, retrievedAt, data} = await getArticle("http://bxjg.circ.gov.cn/web/site0/tab5223/info236974.htm");

    uri.should.equal('http://bxjg.circ.gov.cn/web/site0/tab5223/info236974.htm');

    title.should.equal('农业保险条例');

    publishedAt.should.equal('2013-02-22');

    moment(retrievedAt).isBefore(moment.utc().add(1, 'minute')).should.equal(true);
    moment(retrievedAt).isAfter(moment.utc().subtract(1, 'minute')).should.equal(true);

    data.should.be.a('string');
    data.length.should.be.above(0);

    data.should.match(/^中华人民共和国国务院令/);
    data.should.match(/农业保险条例》已经2012年10月24日国务院第222次常务会议通过，现予公布，自2013年3月1日起施行。/);
    data.should.match(/第一条 为了规范农业保险活动，保护农业保险活动当事人的合法权益，提高农业生产抗风险能力，促进农业保险事业健康发展，根据《中华人民共和国保险法》、《中华人民共和国农业法》等法律，制定本条例。/);
    data.should.match(/第三十三条 本条例自2013年3月1日起施行。$/);
  });
});
