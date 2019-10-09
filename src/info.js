/*
* FIWARE-IOTA
* Author: harpreet.singh@fiware.org
* Github: https://github.com/singhhp1069/fiware-iota
*/

import * as iotalib from '@iota/core';

/**
 * @method getNodeInfo
 * @description get the information about the node
 * @returns {Promise} callback with <response>Object, <error>Object if any
 */
const getNodeInfo = () => {
  const instance = iotalib.composeAPI(global.config.compose);
  return new Promise((resolve, reject) => {
    instance.getNodeInfo().then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  });
};

// eslint-disable-next-line import/prefer-default-export
export { getNodeInfo };
