const run = async () => {
  await require('./circ/index')();
};

run().catch(err => console.error(err));
