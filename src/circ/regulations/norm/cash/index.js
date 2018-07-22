const getList = require('../getList');
const getArticle = require('../getArticle');
const {sync} = require('../../../../utils');

const category = 'circ.regulations.norm.cash';

const run = () => sync(() => getList('资金运用类'), getArticle, category).catch(err => console.error(err));

module.exports = run;
