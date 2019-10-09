/*
* FIWARE-IOTA
* Author: harpreet.singh@fiware.org
* Github: https://github.com/singhhp1069/fiware-iota
*/
import * as iotalib from '@iota/core';
import * as iotautil from '@iota/converter';

/**
 * @method createTransaction
 * @description Create a transaction
 * @param {string} address address of the user
 * @param {string} seed seed belong to the address to create transaction
 * @param {string} message value to be put in transation
 * @param {string} tag (optional) tag
 * @returns {Promise} callback with <response>Object, <error>Object if any
 */
const createTransaction = (address, seed, message, tag) => {
  // check if address exist or empty
  if ((typeof address === 'undefined') || address === '') {
    throw new Error('address is missing');
  }
  // check if seed exist or empty
  if ((typeof seed === 'undefined') || seed === '') {
    throw new Error('seed is missing');
  }
  // check if message exist or empty
  if ((typeof message === 'undefined') || message === '') {
    throw new Error('message is missing');
  }
  // create an instance of iota
  const instance = iotalib.composeAPI(global.config.compose);
  // Send a bundle of zero-value transactions
  const transfer = [
    {
      value: 0,
      address,
      message: iotautil.asciiToTrytes(message),
      tag: (typeof tag !== 'undefined') ? tag : '',
    }
  ];
  return new Promise((resolve, reject) => {
    /* Create a bundle and pass the returned bundle trytes to the sendTrytes()
        * method to do tip selection, proof of work, and send the bundle to the node.
        * tip selection : https://docs.iota.org/docs/node-software/0.1/iri/concepts/tip-selection
        * proof of work : https://docs.iota.org/docs/dev-essentials/0.1/concepts/minimum-weight-magnitude
        */
    instance.prepareTransfers(seed, transfer)
      .then(trytes => instance.sendTrytes(trytes, 3, 9))
      .then((response) => {
        /* in response
        * currentIndex field is the position of the transaction in the bundle
        * lastIndex field is the last transaction in the bundle,
        * which indicates the total number of transactions in it
        */
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * @method fetchTransaction
 * @description fetch transactions belongs to specific address
 * @param {string} address address of the user
 * @returns {Promise} callback with <response>Object, <error>Object if any
 */
const fetchTransaction = (address) => {
  // check if address exist or empty
  if ((typeof address === 'undefined') || address === '') {
    throw new Error('address is missing');
  }
  // iota needed address as an array
  const addresses = (Array.isArray(address)) ? address : new Array(address);
  // create an instance of iota
  const instance = iotalib.composeAPI(global.config.compose);
  return new Promise((resolve, reject) => {
    instance.findTransactionObjects({ addresses })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * @method statusTransaction
 * @description status of the transactions
 * @param {Array} transactions transaction Hash
 * @returns {Promise} callback with <response>Object, <error>Object if any
 */
const statusTransaction = (transations) => {
  if ((typeof transations === 'undefined') || !Array.isArray(transations)) {
    throw new Error('either transationHash is missing or incorrect type, please pass transactionHash as array of string');
  }
  const instance = iotalib.composeAPI(global.config.compose);
  return new Promise((resolve, reject) => {
    instance.getLatestInclusion(transations).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  });
};

/**
 * @method confirmTransaction
 * @description confirm of the transaction mannually (if any conflict)
 * @param {Array} transactions transaction Hash
 * @returns {Promise} callback with <response>Object, <error>Object if any
 */

const confirmTransaction = () => {
  /*
    * transaction can be stuck because of the following reasons
    * 1. tail transaction is too old to be selected during tip selection
    * 2. if it's attached to a part of the Tangle that leads to an invalid state
    * such as a double-spend (inconsistent subtangle).
    */
  // implementation pending
};

export {
  createTransaction,
  statusTransaction,
  fetchTransaction,
  confirmTransaction,
};
