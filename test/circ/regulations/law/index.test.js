const should = require('chai').should();
const moment = require('moment');
const getList = require('../../../../src/circ/regulations/law/getList');
const getArticle = require('../../../../src/circ/regulations/law/getArticle');

describe('Get 法律 uri list', function () {
  it('Should get articles uri list', async () => {
    const uris = await getList();
    uris.should.be.an('array');
    uris.length.should.be.above(0);
  });
});

describe('Get 法律 article', function () {
  this.timeout(20000);
  it('Should get 中华人民共和国保险法（2015年修正本） with uri', async () => {
    const {title, uri, publishedAt, publishedBy, retrievedAt, data} = await getArticle("http://search.chinalaw.gov.cn/law/searchTitleDetail?LawID=402048&Query=%E4%BF%9D%E9%99%A9%E6%B3%95&IsExact=");

    uri.should.equal('http://search.chinalaw.gov.cn/law/searchTitleDetail?LawID=402048&Query=%E4%BF%9D%E9%99%A9%E6%B3%95&IsExact=');

    title.should.equal('中华人民共和国保险法（2015年修正本）');

    publishedAt.should.equal('2015.04.24');
    publishedBy.should.equal('全国人民代表大会常务委员会');

    moment(retrievedAt).isBefore(moment.utc().add(1, 'minute')).should.equal(true);
    moment(retrievedAt).isAfter(moment.utc().subtract(1, 'minute')).should.equal(true);

    data.should.be.a('string');
    data.length.should.be.above(0);

    data.should.match(/为了规范保险活动，保护保险活动当事人的合法权益，加强对保险业的监督管理，维护社会经济秩序和社会公共利益，促进保险事业的健康发展，制定本法。/);
    data.should.match(/国务院保险监督管理机构根据履行职责的需要设立派出机构。派出机构按照国务院保险监督管理机构的授权履行监督管理职责。/);
    data.should.match(/本法自2009年10月1日起施行。$/);
  });

  it('Should get 全国人民代表大会常务委员会关于修改《中华人民共和国计量法》等五部法律的决定(节录) with uri', async () => {
    const {title, uri, publishedAt, publishedBy, retrievedAt, data} = await getArticle("http://bxjg.circ.gov.cn/web/site0/tab5222/info3978151.htm");

    uri.should.equal('http://bxjg.circ.gov.cn/web/site0/tab5222/info3978151.htm');

    title.should.equal('全国人民代表大会常务委员会关于修改《中华人民共和国计量法》等五部法律的决定(节录)');

    publishedAt.should.equal('2015-10-30');
    publishedBy.should.equal('（2015年4月24日第十二届全国人民代表大会常务委员会第十四次会议通过）');

    moment(retrievedAt).isBefore(moment.utc().add(1, 'minute')).should.equal(true);
    moment(retrievedAt).isAfter(moment.utc().subtract(1, 'minute')).should.equal(true);

    data.should.be.a('string');
    data.length.should.be.above(0);

    data.should.match(/^\s*第十二届全国人民代表大会常务委员会第十四次会议决定，对下列法律中有关行政审批、工商登记前置审批或者价格管理的规定作出修改：/);
    data.should.match(/……/);
    data.should.match(/一）删去第七十九条中的“代表机构”。/);
    data.should.match(/本决定自公布之日起施行。/);
    data.should.match(/中华人民共和国计量法》、《中华人民共和国烟草专卖法》、《中华人民共和国保险法》、《中华人民共和国民用航空法》、《中华人民共和国畜牧法》根据本决定作相应修改，重新公布。$/);
  });

  it('Should get 中华人民共和国保险法（2009年修订） with uri', async () => {
    const {title, uri, publishedAt, publishedBy, retrievedAt, data} = await getArticle("http://bxjg.circ.gov.cn/web/site0/tab5222/info94860.htm");

    uri.should.equal('http://bxjg.circ.gov.cn/web/site0/tab5222/info94860.htm');

    title.should.equal('中华人民共和国保险法（2009年修订）');

    publishedAt.should.equal('2015-03-03');
    publishedBy.should.equal('（１９９５年６月３０日第八届全国人民代表大会常务委员会第十四次会议通过　根据2002年10月28日第九届全国人民代表大会常务委员会第三十次会议《关于修改〈中华人民共和国保险法〉的决定》修正　2009年2月28日第十一届全国人民代表大会常务委员会第七次会议修订）');

    moment(retrievedAt).isBefore(moment.utc().add(1, 'minute')).should.equal(true);
    moment(retrievedAt).isAfter(moment.utc().subtract(1, 'minute')).should.equal(true);

    data.should.be.a('string');
    data.length.should.be.above(0);

    data.should.match(/^目　录/);
    data.should.match(/第一章\s*总则/);
    data.should.match(/第一百八十七条\s*本法自2009年10月1日起施行。$/);
  });
});
