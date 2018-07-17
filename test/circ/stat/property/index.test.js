const should = require('chai').should();
const moment = require('moment');
const getList = require('../../../../src/circ/stat/property/getList');
const getArticle = require('../../../../src/circ/stat/property/getArticle');

describe('Get article uri list', function () {
  it('Should get articles uri list', async () => {
    const uris = await getList();
    uris.should.be.an('array');
    uris.length.should.be.above(0);
    uris[0].startsWith('http://bxjg.circ.gov.cn/').should.equal(true)
  });
});

describe('Get article', function () {
  it('Should get article with uri published at 2018-07-05', async () => {
    const {title, uri, publishedAt, retrievedAt, data} = await getArticle("http://bxjg.circ.gov.cn/web/site0/tab5202/info4112313.htm");

    uri.should.equal('http://bxjg.circ.gov.cn/web/site0/tab5202/info4112313.htm');

    title.should.equal('2018年1-5月财产保险公司原保险保费收入情况表');

    publishedAt.should.equal('2018-07-05');

    moment(retrievedAt).isBefore(moment.utc().add(1, 'minute')).should.equal(true);
    moment(retrievedAt).isAfter(moment.utc().subtract(1, 'minute')).should.equal(true);

    data.should.be.an('array');
    data.length.should.be.above(0);
    data[0].name.should.equal('');
    data[0].value.should.equal('单位：万元');

    data[1].category.should.equal('资本结构');
    data[1].order.should.equal('序号');
    data[1].name.should.equal('公司名称');
    data[1].value.should.equal('原保险保费收入');

    data[2].category.should.equal('中资');
    data[2].order.should.equal('1');
    data[2].name.should.equal('人保股份');
    data[2].value.should.equal('16666388.17');

    data[3].category.should.equal('中资');
    data[3].order.should.equal('2');
    data[3].name.should.equal('大地财产');
    data[3].value.should.equal('1827409.18');

    data[67].category.should.equal('中资');
    data[67].order.should.equal('--');
    data[67].name.should.equal('小计');
    data[67].value.should.equal('48777042.1');

    data[68].category.should.equal('外资');
    data[68].order.should.equal('66');
    data[68].name.should.equal('史带财产');
    data[68].value.should.equal('7691.74');

    data[69].category.should.equal('外资');
    data[69].order.should.equal('67');
    data[69].name.should.equal('美亚');
    data[69].value.should.equal('76823.53');

    data[90].category.should.equal('外资');
    data[90].order.should.equal('--');
    data[90].name.should.equal('小计');
    data[90].value.should.equal('835779.86');

    data[91].category.should.equal('');
    data[91].order.should.equal('--');
    data[91].name.should.equal('合计');
    data[91].value.should.equal('49612821.96');

    data[92].name.should.equal('备注');
    data[92].value.startsWith('注：1、本表数据是保险业执行').should.equal(true);
  });

  it('Should get article with uri published at 2018-05-11', async () => {
    const {title, uri, publishedAt, retrievedAt, data} = await getArticle("http://bxjg.circ.gov.cn/web/site0/tab5202/info4106927.htm");

    uri.should.equal('http://bxjg.circ.gov.cn/web/site0/tab5202/info4106927.htm');

    title.should.equal('2018年1-3月财产保险公司原保险保费收入情况表');

    publishedAt.should.equal('2018-05-11');

    moment(retrievedAt).isBefore(moment.utc().add(1, 'minute')).should.equal(true);
    moment(retrievedAt).isAfter(moment.utc().subtract(1, 'minute')).should.equal(true);

    data.should.be.an('array');
    data.length.should.be.above(0);
    data[0].name.should.equal('');
    data[0].value.should.equal('单位：万元');

    data[1].category.should.equal('资本结构');
    data[1].order.should.equal('序号');
    data[1].name.should.equal('公司名称');
    data[1].value.should.equal('原保险保费收入');

    data[2].category.should.equal('中资');
    data[2].order.should.equal('1');
    data[2].name.should.equal('人保股份');
    data[2].value.should.equal('10606084.26');

    data[3].category.should.equal('中资');
    data[3].order.should.equal('2');
    data[3].name.should.equal('大地财产');
    data[3].value.should.equal('1138047.81');

    data[67].category.should.equal('中资');
    data[67].order.should.equal('--');
    data[67].name.should.equal('小计');
    data[67].value.should.equal('30396316.60');

    data[68].category.should.equal('外资');
    data[68].order.should.equal('66');
    data[68].name.should.equal('史带财产');
    data[68].value.should.equal('4949.94');

    data[69].category.should.equal('外资');
    data[69].order.should.equal('67');
    data[69].name.should.equal('美亚');
    data[69].value.should.equal('56146.19');

    data[90].category.should.equal('外资');
    data[90].order.should.equal('--');
    data[90].name.should.equal('小计');
    data[90].value.should.equal('507580.12');

    data[91].category.should.equal('');
    data[91].order.should.equal('--');
    data[91].name.should.equal('合计');
    data[91].value.should.equal('30903896.72');

    data[92].name.should.equal('备注');
    data[92].value.startsWith('注：1、本表数据是保险业执行').should.equal(true);
  });
});
