const getList = require('../getList');
const getArticle = require('../getArticle');
const {sync} = require('../../../../utils');

const category = 'circ.regulations.norm.life';

const run = () => sync(() => getList('人身保险类'), getArticle, category).catch(err => console.error(err));

module.exports = run;
