const getList = require('../getList');
const getArticle = require('../getArticle');
const {sync} = require('../../../../utils');

const category = 'circ.regulations.norm.institution';

const run = () => sync(() => getList('机构管理类'), getArticle, category).catch(err => console.error(err));

module.exports = run;
