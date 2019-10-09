/*
* FIWARE-IOTA
* Author: harpreet.singh@fiware.org
* Github: https://github.com/singhhp1069/fiware-iota
*/
import {
  setProvider,
  getProvider,
  setTcpProvider,
  getTcpProvider,
} from './config';

import {
  getNodeInfo
} from './info';

import {
  generateSeed,
  createNewAddress,
  encodeMessage,
  decodeMessage,
  sortTransactionMessage,
  getBalance
} from './util';

import {
  createMamTransaction,
  fetchMamTransaction,
} from './mam';

import {
  createTransaction,
  fetchTransaction,
  statusTransaction,
  confirmTransaction,
} from './transaction';

module.exports = {
  setProvider,
  getProvider,
  setTcpProvider,
  getTcpProvider,

  getNodeInfo,

  generateSeed,
  createNewAddress,
  encodeMessage,
  decodeMessage,
  sortTransactionMessage,
  getBalance,

  createMamTransaction,
  fetchMamTransaction,

  createTransaction,
  fetchTransaction,
  statusTransaction,
  confirmTransaction,
};
