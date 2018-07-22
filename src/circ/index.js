const run = async () => {
  try {
    await require('./stat/data/index')();
    await require('./stat/deals/index')();
    await require('./stat/enterprise/index')();
    await require('./stat/life/index')();
    await require('./stat/property/index')();
    await require('./stat/regional/index')();
    await require('./regulations/law/index')();
    await require('./regulations/administration/index')();
    await require('./regulations/division/index')();
    await require('./regulations/norm/index')();
    await require('./regulations/other/index')();
  } catch (err) {
    console.error(err);
  }
};

module.exports = run;
