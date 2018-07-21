const run = async () => {
  try {
    await require('./stat/data/index')();
    await require('./stat/deals/index')();
    await require('./stat/enterprise/index')();
    await require('./stat/life/index')();
    await require('./stat/property/index')();
    await require('./stat/regional/index')();
  } catch (err) {
    console.error(err);
  }
};

module.exports = run;
