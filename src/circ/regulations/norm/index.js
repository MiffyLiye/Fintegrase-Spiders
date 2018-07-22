const run = async () => {
  try {
    await require('./misc/index')();
    await require('./institution/index')();
    await require('./property/index')();
    await require('./life/index')();
    await require('./cash/index')();
    await require('./accounting/index')();
    await require('./info/index')();
    await require('./agent/index')();
    await require('./inspection/index')();
  } catch (err) {
    console.error(err);
  }
};

module.exports = run;
