const getList = require('../getList');
const getArticle = require('../getArticle');
const {sync} = require('../../../../utils');

const category = 'circ.regulations.norm.agent';

const run = () => sync(() => getList('中介类'), getArticle, category).catch(err => console.error(err));

module.exports = run;
