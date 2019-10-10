/*
 * FIWARE-IOTA
 * Author: harpreet.singh@fiware.org
 * Github: https://github.com/singhhp1069/fiware-iota
 */
import cp from 'child_process';
import os from 'os';
import * as iotalib from '@iota/core';
import * as iotautil from '@iota/converter';

/**
 * @method generateSeed
 * @description Create a new seed
 * @returns {string} generated seed
 */
const generateSeed = () => {
  switch (os.platform()) {
    case 'darwin':
      return cp
        .execSync(
          "cat /dev/urandom | LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1",
          { maxBuffer: 82, encoding: 'ascii' }
        )
        .trim();
    case 'win32':
      throw new Error(
        "IOTA seed can't be generated for Windows operating system at the moment:("
      );
    default:
      return (
        cp
          // eslint-disable-next-line no-template-curly-in-string
          .execSync('cat /dev/urandom | tr -dc A-Z9 | head -c${1:-81}', {
            encoding: 'ascii',
          })
          .trim()
      );
  }
};

/**
 * @method createNewAddress
 * @description Create a new address
 * @param {string} seed seed to be use to create a new account
 * @param {Object} [options = {index: 0, security: 2}] (optional) options,
 * same address will be derived if seed, index and secuity is same
 * @returns {Promise} callback with <response>Object, <error>Object if any
 */
const createNewAddress = (seed, option) => {
  // option param for security level
  const options = typeof option !== 'undefined' ? option : global.config.security;
  // initiating instance
  const instance = iotalib.composeAPI(global.config.compose);
  // check if seed exist or empty
  if (typeof seed === 'undefined' || seed === '') {
    throw new Error('seed is missing');
  }
  return new Promise((resolve, reject) => {
    instance
      .getNewAddress(seed, options)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * @method getBalance
 * @description get balance of the account
 * @param {string} address address
 * @returns {Promise} callback with <response>Object, <error>Object if any
 */
const getBalance = () => {
  // implementation pending
};

/**
 * @method sortTransactionMessage
 * @description sort transaction messages
 * @param {Array} transaction transactions
 * @returns {Array} sorted  transactions
 */
const sortTransactionMessage = transaction => transaction
  .sort((a, b) => a.currentIndex - b.currentIndex)
  .map(tx => tx.signatureMessageFragment)
  .join('');

/**
 * @method decodeMessage
 * @description decode encoded message
 * @param {string} encodedMessage encoded Message
 * @returns {string} decoded message
 */
const decodeMessage = encodedMessage => iotautil.trytesToAscii(encodedMessage);

/**
 * @method encodeMessage
 * @description encode decoded message
 * @param {string} decodedMessage decoded Message
 * @returns {string} encoded message
 */
const encodeMessage = decodedMessage => iotautil.asciiToTrytes(decodedMessage);

export {
  generateSeed,
  createNewAddress,
  getBalance,
  sortTransactionMessage,
  encodeMessage,
  decodeMessage,
};
