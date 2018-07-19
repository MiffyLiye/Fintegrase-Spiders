const should = require('chai').should();
const moment = require('moment');
const getList = require('../../../../src/circ/stat/enterprise/getList');
const getArticle = require('../../../../src/circ/stat/enterprise/getArticle');

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
    const {title, uri, publishedAt, retrievedAt, data} = await getArticle("http://bxjg.circ.gov.cn/web/site0/tab5204/info4106930.htm");

    uri.should.equal('http://bxjg.circ.gov.cn/web/site0/tab5204/info4106930.htm');

    title.should.equal('2018年1-3月保险机构企业年金等受托管理业务情况表');

    publishedAt.should.equal('2018-05-12');

    moment(retrievedAt).isBefore(moment.utc().add(1, 'minute')).should.equal(true);
    moment(retrievedAt).isAfter(moment.utc().subtract(1, 'minute')).should.equal(true);

    data.should.be.an('array');
    data.length.should.be.above(0);
    data[0].name.should.equal('');
    data[0].trustedFee.should.equal('单位：万元');

    data[1].name.should.equal('公司简称');
    data[1].trustedFee.should.equal('企业年金受托管理业务缴费');
    data[1].investmentFee.should.equal('企业年金投资管理业务缴费');
    data[1].otherFee.should.equal('养老保障及其他委托管理业务缴费');
    data[1].trustedAsset.should.equal('企业年金受托管理资产');
    data[1].investmentAsset.should.equal('企业年金投资管理资产');
    data[1].otherAsset.should.equal('养老保障及其他委托管理资产');

    data[2].name.should.equal('国寿养老');
    data[2].trustedFee.should.equal('1488902.21');
    data[2].investmentFee.should.equal('1052208.23');
    data[2].otherFee.should.equal('15071157.26');
    data[2].trustedAsset.should.equal('27852970.56');
    data[2].investmentAsset.should.equal('14919005.63');
    data[2].otherAsset.should.equal('20321849.85');

    data[5].name.should.equal('泰康养老');
    data[5].trustedFee.should.equal('215688.16');
    data[5].investmentFee.should.equal('');
    data[5].otherFee.should.equal('18217.32');
    data[5].trustedAsset.should.equal('3351566.05');
    data[5].investmentAsset.should.equal('0.00');
    data[5].otherAsset.should.equal('127349.35');

    data[7].name.should.equal('安邦养老');
    data[7].trustedFee.should.equal('');
    data[7].investmentFee.should.equal('');
    data[7].otherFee.should.equal('-9127.65');
    data[7].trustedAsset.should.equal('');
    data[7].investmentAsset.should.equal('');
    data[7].otherAsset.should.equal('86377.27');

    data[8].name.should.equal('人保资产');
    data[8].trustedFee.should.equal('');
    data[8].investmentFee.should.equal('131490.03');
    data[8].otherFee.should.equal('');
    data[8].trustedAsset.should.equal('');
    data[8].investmentAsset.should.equal('2043481.48');
    data[8].otherAsset.should.equal('551880.06');

    data[11].name.should.equal('合计');
    data[11].trustedFee.should.equal('3369550.00');
    data[11].investmentFee.should.equal('3924964.19');
    data[11].otherFee.should.equal('33196949.79');
    data[11].trustedAsset.should.equal('65202300.74');
    data[11].investmentAsset.should.equal('70591525.79');
    data[11].otherAsset.should.equal('67501656.07');

    data[12].name.should.equal('备注');
    data[12].trustedFee.startsWith('注：1、上数据来源于相关保险机构报送保监会统计报表数据').should.equal(true);
  });

  it('Should get article with uri 2017', async () => {
    const {title, uri, publishedAt, retrievedAt, data} = await getArticle("http://bxjg.circ.gov.cn/web/site0/tab5204/info4089156.htm");

    uri.should.equal('http://bxjg.circ.gov.cn/web/site0/tab5204/info4089156.htm');

    title.should.equal('2017年1-9月保险机构企业年金等受托管理业务情况表');

    publishedAt.should.equal('2017-11-21');

    moment(retrievedAt).isBefore(moment.utc().add(1, 'minute')).should.equal(true);
    moment(retrievedAt).isAfter(moment.utc().subtract(1, 'minute')).should.equal(true);

    data.should.be.an('array');
    data.length.should.be.above(0);
    data[0].name.should.equal('');
    data[0].trustedFee.should.equal('单位：万元');

    data[1].name.should.equal('公司简称');
    data[1].trustedFee.should.equal('企业年金受托管理业务缴费');
    data[1].investmentFee.should.equal('企业年金投资管理业务缴费');
    data[1].otherFee.should.equal('养老保障及其他委托管理业务缴费');
    data[1].trustedAsset.should.equal('企业年金受托管理资产');
    data[1].investmentAsset.should.equal('企业年金投资管理资产');
    data[1].otherAsset.should.equal('养老保障及其他委托管理资产');

    data[11].name.should.equal('合计');

    data[12].name.should.equal('备注');
    data[12].trustedFee.startsWith('注：1、上数据来源于相关保险机构报送保监会统计报表数据').should.equal(true);
  });
});
