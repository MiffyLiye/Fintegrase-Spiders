const getList = require('./getList');
const getArticle = require('./getArticle');
const {sync} = require('../../../config');

const category = 'circ.stat.property';

sync(getList, getArticle, category).catch(err => console.error(err));
