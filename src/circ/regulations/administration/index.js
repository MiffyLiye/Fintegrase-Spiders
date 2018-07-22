const getList = require('./getList');
const getArticle = require('./getArticle');
const {sync} = require('../../../utils');

const category = 'circ.regulations.administration';

const run = () => sync(getList, getArticle, category).catch(err => console.error(err));

module.exports = run;
