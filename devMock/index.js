/* eslint-disable import/no-dynamic-require */

module.exports = (app) => {
  app.get('/mock/:name', (req, res) => {
    const { name } = req.params;
    const resData = require(`./${name}.json`);
    res.json(resData);
  });
};
