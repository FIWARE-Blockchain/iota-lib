/*
 * FIWARE-IOTA
 * Author: harpreet.singh@fiware.org
 * Github: https://github.com/FIWARE-Blockchain/fiware-iota
 */
import * as iotamam from '@iota/mam';
import * as iotautil from '@iota/converter';

/**
 * @method createMamTransaction
 * @description Create MaM transaction
 * @param {string} data data to be submitted in iota
 * @param {object} [options= { mode : public }] (optional)
 * for restricted options = {mode: restricted, secret: value}
 * @returns {Promise} callback with <response>Object, <error>Object if any
 */
const createMamTransaction = (data, options) => {
  const option = typeof options !== 'undefined' ? options : {};
  option.mode = typeof options !== 'undefined' && 'mode' in options
    ? options.mode
    : 'public';
  // eslint-disable-next-line no-unused-expressions
  option.mode === 'restricted' && 'secret' in options
    ? (option.secret = options.secret)
    : '';
  // init MaM
  let instance = iotamam.init(global.config.compose.provider);
  // mode selection
  // either public
  // or restricted with mendatory field 'secret'
  if (option.mode === 'public') {
    instance = iotamam.changeMode(instance, option.mode);
  } else if (option.mode === 'restricted' && option.secret !== '') {
    instance = iotamam.changeMode(instance, option.mode, option.secret);
  } else {
    throw new Error(
      'invalid options either mode is incorrect or secret is missing'
    );
  }
  // Convert the JSON to trytes and create a MAM message
  const trytes = iotautil.asciiToTrytes(data);
  const message = iotamam.create(instance, trytes);
  // Update the MAM state to the state of this latest message
  // We need this so the next publish action knows it's state
  instance = message.state;
  return new Promise((resolve, reject) => {
    iotamam
      .attach(message.payload, message.address, 3, 9)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @method fetchMamTransaction
 * @description Fetch MaM transaction
 * @param {string} hash hash to be fetched
 * @param {string} mode mode could be either public or restricted
 * @param {string} secret secret of the data in case of restricted mode only
 * @returns {Promise} callback with <response>Object, <error>Object if any
 */
const fetchMamTransaction = (hash, mode, secret, callback) => {
  // check if hash exit or empty
  if (typeof hash === 'undefined' || hash === '') {
    throw new Error('hash is missing');
  }
  // check if mode exit or empty
  if (typeof mode === 'undefined' || mode === '') {
    throw new Error('mode is missing');
  }
  const secretCode = typeof secret !== 'undefined' && mode === 'restricted' ? secret : null;
  // init MaM
  iotamam.init(global.config.compose.provider);
  iotamam.fetch(hash, mode, secretCode, (res) => {
    callback(res);
  });
};

export { createMamTransaction, fetchMamTransaction };
