const should = require('chai').should();
const moment = require('moment');
const getList = require('../../../../src/circ/stat/life/getList');
const getArticle = require('../../../../src/circ/stat/life/getArticle');

describe('Get article uri list', function () {
  it('Should get articles uri list', async () => {
    const uris = await getList();
    uris.should.be.an('array');
    uris.length.should.be.above(0);
    uris[0].startsWith('http://bxjg.circ.gov.cn/').should.equal(true)
  });
});

describe('Get article', function () {
  it('Should get article with uri', async () => {
    const {title, uri, publishedAt, retrievedAt, data} = await getArticle("http://bxjg.circ.gov.cn/web/site0/tab5203/info4112314.htm");

    uri.should.equal('http://bxjg.circ.gov.cn/web/site0/tab5203/info4112314.htm');

    title.should.equal('2018年1-5月人身保险公司原保险保费收入情况表');

    publishedAt.should.equal('2018-07-05');

    moment(retrievedAt).isBefore(moment.utc().add(1, 'minute')).should.equal(true);
    moment(retrievedAt).isAfter(moment.utc().subtract(1, 'minute')).should.equal(true);

    data.should.be.an('array');
    data.length.should.be.above(0);
    data[0].name.should.equal('');
    data[0].original.should.equal('单位：万元');

    data[1].category.should.equal('资本结构');
    data[1].order.should.equal('序号');
    data[1].name.should.equal('公司名称');
    data[1].original.should.equal('原保险保费收入');
    data[1].investment.should.equal('保户投资款新增交费');
    data[1].linked.should.equal('投连险独立账户新增交费');

    data[2].category.should.equal('中资');
    data[2].order.should.equal('1');
    data[2].name.should.equal('国寿股份');
    data[2].original.should.equal('30708540.46');
    data[2].investment.should.equal('2696923.63');
    data[2].linked.should.equal('');

    data[4].category.should.equal('中资');
    data[4].order.should.equal('3');
    data[4].name.should.equal('平安寿');
    data[4].original.should.equal('24377952.47');
    data[4].investment.should.equal('6083504.57');
    data[4].linked.should.equal('94681.39');

    data[13].category.should.equal('中资');
    data[13].order.should.equal('12');
    data[13].name.should.equal('国寿存续');
    data[13].original.should.equal('120898.33');
    data[13].investment.should.equal('');
    data[13].linked.should.equal('');

    data[61].category.should.equal('中资');
    data[61].order.should.equal('--');
    data[61].name.should.equal('小计');
    data[61].original.should.equal('132302101.64');
    data[61].investment.should.equal('38631579.09');
    data[61].linked.should.equal('2203617.37');

    data[62].category.should.equal('外资');
    data[62].order.should.equal('60');
    data[62].name.should.equal('中宏人寿');
    data[62].original.should.equal('350650.81');
    data[62].investment.should.equal('6538.49');
    data[62].linked.should.equal('238.34');

    data[90].category.should.equal('外资');
    data[90].order.should.equal('--');
    data[90].name.should.equal('小计');
    data[90].original.should.equal('9114996.49');
    data[90].investment.should.equal('1130726.08');
    data[90].linked.should.equal('164481.49');

    data[91].category.should.equal('');
    data[91].order.should.equal('--');
    data[91].name.should.equal('合计');
    data[91].original.should.equal('141417098.13');
    data[91].investment.should.equal('39762305.17');
    data[91].linked.should.equal('2368098.86');

    data[92].name.should.equal('备注');
    data[92].original.startsWith('注：1、本表数据是保险业执行').should.equal(true);
  });

  it('Should get article with uri 2017-06-28', async () => {
    const {title, uri, publishedAt, retrievedAt, data} = await getArticle("http://bxjg.circ.gov.cn/web/site0/tab5203/info4074075.htm");

    uri.should.equal('http://bxjg.circ.gov.cn/web/site0/tab5203/info4074075.htm');

    title.should.equal('2017年1-5月人身保险公司原保险保费收入情况表');

    publishedAt.should.equal('2017-06-28');

    moment(retrievedAt).isBefore(moment.utc().add(1, 'minute')).should.equal(true);
    moment(retrievedAt).isAfter(moment.utc().subtract(1, 'minute')).should.equal(true);

    data.should.be.an('array');
    data.length.should.be.above(0);
    data[0].name.should.equal('');
    data[0].original.should.equal('单位：万元');

    data[1].category.should.equal('资本结构');
    data[1].order.should.equal('序号');
    data[1].name.should.equal('公司名称');
    data[1].original.should.equal('原保险保费收入');
    data[1].investment.should.equal('保户投资款新增交费');
    data[1].linked.should.equal('投连险独立账户新增交费');

    data[2].category.should.equal('中资');
    data[2].order.should.equal('1');
    data[2].name.should.equal('国寿股份');
    data[2].original.should.equal('29849990.72');
    data[2].investment.should.equal('4666651.32');
    data[2].linked.should.equal('');

    data[4].category.should.equal('中资');
    data[4].order.should.equal('3');
    data[4].name.should.equal('平安寿');
    data[4].original.should.equal('20174827.39');
    data[4].investment.should.equal('4654808.81');
    data[4].linked.should.equal('86262.97');

    data[13].category.should.equal('中资');
    data[13].order.should.equal('12');
    data[13].name.should.equal('国寿存续');
    data[13].original.should.equal('229183.42');
    data[13].investment.should.equal('');
    data[13].linked.should.equal('');

    data[56].category.should.equal('中资');
    data[56].order.should.equal('--');
    data[56].name.should.equal('小计');
    data[56].original.should.equal('149675544.74');
    data[56].investment.should.equal('28911012.50');
    data[56].linked.should.equal('1078263.72');

    data[57].category.should.equal('外资');
    data[57].order.should.equal('55');
    data[57].name.should.equal('中宏人寿');
    data[57].original.should.equal('287267.95');
    data[57].investment.should.equal('8143.38');
    data[57].linked.should.equal('391.02');

    data[85].category.should.equal('外资');
    data[85].order.should.equal('--');
    data[85].name.should.equal('小计');
    data[85].original.should.equal('10198274.98');
    data[85].investment.should.equal('1932707.51');
    data[85].linked.should.equal('135052.04');

    data[86].category.should.equal('');
    data[86].order.should.equal('--');
    data[86].name.should.equal('合计');
    data[86].original.should.equal('159873819.73');
    data[86].investment.should.equal('30843720.02');
    data[86].linked.should.equal('1213315.76');

    data[87].name.should.equal('备注');
    data[87].original.startsWith('注：1、本表数据是保险业执行').should.equal(true);
  });
});
