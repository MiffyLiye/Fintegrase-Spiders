const should = require('chai').should();
const moment = require('moment');
const getList = require('../../../../src/circ/regulations/division/getList');
const getArticle = require('../../../../src/circ/regulations/division/getArticle');

describe('Get 部门规章 uri list', function () {
  it('Should get articles uri list', async () => {
    const uris = await getList();
    uris.should.be.an('array');
    uris.length.should.be.above(0);
  });
});

describe('Get 部门规章 article', function () {
  it('Should get 保险公司股权管理办法 with uri', async () => {
    const {title, uri, publishedAt, retrievedAt, data} = await getArticle("http://bxjg.circ.gov.cn/web/site0/tab5224/info4101516.htm");

    uri.should.equal('http://bxjg.circ.gov.cn/web/site0/tab5224/info4101516.htm');

    title.should.equal('保险公司股权管理办法');

    publishedAt.should.equal('2018-03-07');

    moment(retrievedAt).isBefore(moment.utc().add(1, 'minute')).should.equal(true);
    moment(retrievedAt).isAfter(moment.utc().subtract(1, 'minute')).should.equal(true);

    data.should.be.a('string');
    data.length.should.be.above(0);

    data.should.match(/^保监会令〔2018〕5号/);
    data.should.match(/《保险公司股权管理办法》已经2018年2月7日中国保险监督管理委员会主席办公会审议通过，现予公布，自2018年4月10日起实施。/);
    data.should.match(/第一条 为了加强保险公司股权监管，规范保险公司股东行为，保护投保人、被保险人、受益人的合法权益，维护保险市场秩序，根据《中华人民共和国公司法》《中华人民共和国保险法》等法律、行政法规，制定本办法。/);
    data.should.match(/同时废止。$/);
  });
});
