'use strict';

require('dotenv').config();

const Web3 = require('web3');
const knex = require('knex')(require('./knexfile'));

async function run() {
  const web3 = new Web3(process.env.ETH_JSON_RPC);

  let latestBlockNumber = await web3.eth.getBlockNumber();
  let currentHeight = (await knex('heights').where({currency: 'eth'}).select('height'))[0].height;
  console.log(`[fetch] inserting blocks from ${currentHeight} to ${latestBlockNumber}`);

  for (let i = currentHeight + 1; i <= latestBlockNumber; i++) {
    let block = await web3.eth.getBlock(i);
    console.log(`[fetch] trying to insert eth block#${i}`);
    try {
      await knex('blocks').insert({
        currency: 'eth',
        height: i,
        data: JSON.stringify(block)
      });
      console.log(`[fetch] \t...success`);
    } catch (err) {
      console.error(`[fetch] \t...failed, skipped`, err);
    }
  }
  await knex('heights')
    .where({currency: 'eth'})
    .update({height: latestBlockNumber});
  console.log(`[fetch] done`);
}

run()
  .catch(err => console.error(err))
  .then(() => process.exit(0));