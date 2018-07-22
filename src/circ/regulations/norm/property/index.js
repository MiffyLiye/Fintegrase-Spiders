const getList = require('../getList');
const getArticle = require('../getArticle');
const {sync} = require('../../../../utils');

const category = 'circ.regulations.norm.property';

const run = () => sync(() => getList('财产保险类'), getArticle, category).catch(err => console.error(err));

module.exports = run;
