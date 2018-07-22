const getList = require('../getList');
const getArticle = require('../getArticle');
const {sync} = require('../../../../utils');

const category = 'circ.regulations.norm.info';

const run = () => sync(() => getList('统计与信息化类'), getArticle, category).catch(err => console.error(err));

module.exports = run;
