'use strict';

const PORT = process.env.PORT || 3000;

const express = require('express');
const knex = require('knex')(require('./knexfile'));
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();

app.use(bodyParser({json: true}));

app.get('/', async (req, res) => {
  let currency = req.query.currency;
  let block = req.query.block;

  console.log(`[api] requested info, currency: ${currency || 'any'}, block: ${block || 'latest'}`);

  let where = {};
  if (currency) where.currency = currency;
  if (block) where.height = block;

  console.log(`[api] trying to read data from DB...`);
  try {
    let info = await knex('blocks')
      .where(where)
      .orderBy('height', 'desc')
      .limit(1)
      .select();
    info = info[0] || null;

    if (info && _.isString(info.data)) {
      info.data = JSON.parse(info.data);
    }
    console.log(`[api] \t ... success`);
    res.json(info);
  } catch (err) {
    console.error(`[api] \t ...failed`, err);
    res.json(null);
  }
});

app.listen(PORT, () => console.log(`[api] server started at port ${PORT}`));