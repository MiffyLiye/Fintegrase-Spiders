const getList = require('../getList');
const getArticle = require('../getArticle');
const {sync} = require('../../../../utils');

const category = 'circ.regulations.norm.accounting';

const run = () => sync(() => getList('财会类'), getArticle, category).catch(err => console.error(err));

module.exports = run;
