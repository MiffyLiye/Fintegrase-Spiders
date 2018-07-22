const getList = require('../getList');
const getArticle = require('../getArticle');
const {sync} = require('../../../../utils');

const category = 'circ.regulations.norm.misc';

const run = () => sync(() => getList('综合类'), getArticle, category).catch(err => console.error(err));

module.exports = run;
