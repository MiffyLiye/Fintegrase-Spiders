const getList = require('./getList');
const getArticle = require('./getArticle');
const {sync} = require('../../../utils');

const category = 'circ.stat.deals';

const run = () => sync(getList, getArticle, category).catch(err => console.error(err));

module.exports = run;
