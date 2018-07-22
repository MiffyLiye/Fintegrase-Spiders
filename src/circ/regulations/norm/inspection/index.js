const getList = require('../getList');
const getArticle = require('../getArticle');
const {sync} = require('../../../../utils');

const category = 'circ.regulations.norm.inspection';

const run = () => sync(() => getList('稽查类'), getArticle, category).catch(err => console.error(err));

module.exports = run;
