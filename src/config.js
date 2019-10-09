/*
* FIWARE-IOTA
* Author: harpreet.singh@fiware.org
* Github: https://github.com/singhhp1069/fiware-iota
*/
// Global configurations
global.config = {
  compose: '',
  zmq: '',
  // param for account creation index 0 and security level 2
  security: {
    index: 0,
    security: 2,
  }
};
// setting default global configuration
global.config.compose = { provider: 'https://nodes.devnet.thetangle.org:443' };
global.config.zmq = { provider: 'tcp://zmq.devnet.iota.org:5556' };

/**
 * @method setProvider
 * @description set a new provider instead default
 */
const setProvider = (providerEndpoint) => {
  if ((typeof providerEndpoint === 'undefined') || providerEndpoint === '') {
    throw new Error('incorrect provider endpoint');
  }
  global.config.compose = providerEndpoint;
};

/**
 * @method setTcpProvider
 * @description set TcpProvider instead default (zmq endpoint)
 */
const setTcpProvider = (tcpEndpoint) => {
  if ((typeof tcpEndpoint === 'undefined') || tcpEndpoint === '') {
    throw new Error('incorrect tcp endpoint');
  }
  global.config.zmq = tcpEndpoint;
};

/**
 * @method getProvider
 * @description get the url of the provider
 * @returns {string} endpoint of the provider
 */
const getProvider = () => global.config.providerEndpoint;

/**
 * @method getNodeInfo
 * @description get the url of Tcp provider (zmq endpoint)
 * @returns {string} endpoint of the provider
 */
const getTcpProvider = () => global.config.tcpEndpoint;

export {
  setProvider,
  getProvider,
  getTcpProvider,
  setTcpProvider,
};
