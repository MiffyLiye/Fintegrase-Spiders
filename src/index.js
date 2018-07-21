const run = async () => {
  await require('./circ/stat/data/index')();
  await require('./circ/stat/deals/index')();
  await require('./circ/stat/enterprise/index')();
  await require('./circ/stat/life/index')();
  await require('./circ/stat/property/index')();
  await require('./circ/stat/regional/index')();
};

run().catch(err => console.error(err));
