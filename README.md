# FIWARE-IOTA Plugin

[![Build Status](https://travis-ci.org/FIWARE-Blockchain/iota-lib.svg?branch=master)](https://travis-ci.org/FIWARE-Blockchain/iota-lib)
[![dependencies Status](https://img.shields.io/FIWARE-Blockchain/iota-lib)](https://img.shields.io/david/FIWARE-Blockchain/iota-lib)
[![devDependencies Status](https://img.shields.io/david/dev/FIWARE-Blockchain/iota-lib)](https://img.shields.io/david/dev/FIWARE-Blockchain/iota-lib)
[![Support badge](https://nexus.lab.fiware.org/repository/raw/public/badges/stackoverflow/fiware.svg)](https://stackoverflow.com/questions/tagged/fiware)
[![Github issues](https://img.shields.io/github/issues/FIWARE-Blockchain/iota-lib)](https://github.com/FIWARE-Blockchain/iota-lib/issues)
[![Coverage Status](https://coveralls.io/repos/github/FIWARE-Blockchain/iota-lib/badge.svg?branch=master)](https://coveralls.io/github/FIWARE-Blockchain/iota-lib?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This project is a library (wrapper around IOTA) ot integrate with FIWARE.

# Background

FIWARE is an open source initiative defining a universal set of standards for context data management which facilitate
the development of Smart Solutions for different domains such as Smart Cities, Smart Industry, Smart Agrifood, and Smart
Energy. IOTA is an open-source distributed ledger that is being built to power the future of the Internet of Things with
feeless microtransactions and data integrity for machines. This library is an intial library(wrapper around IOTA libs)
to support FIWARE Ecosystem.

# Installation

```sh
npm install --save iota-lib
```

# Functions

## getProvider() ⇒ string

get the url of the provider **Returns**: string - endpoint of the provider

## getTcpProvider() ⇒ string

get the url of Tcp provider (zmq endpoint) **Returns**: string- endpoint of the provider

## setProvider()

set a new provider instead default

```
https://nodes.devnet.thetangle.org:443
```

## setTcpProvider()

set TcpProvider instead default (zmq endpoint)

```
tcp://zmq.devnet.iota.org:5556
```

## getNodeInfo() ⇒ Promise

get the information about the node **Returns**: Promise - callback with <response>Object, <error>Object if any

## createMamTransaction(data, [options]) ⇒ Promise

Create MaM transaction **Returns**: Promise - callback with <response>Object, <error>Object if any

| Param     | Type   | Default           | Description                                                           |
| --------- | ------ | ----------------- | --------------------------------------------------------------------- |
| data      | string |                   | data to be submitted in iota                                          |
| [options] | object | { mode : public } | (optional) for restricted options = {mode: restricted, secret: value} |

## fetchMamTransaction(hash, mode, secret) ⇒ Promise

Fetch MaM transaction **Returns**: Promise - callback with <response>Object, <error>Object if any

| Param  | Type   | Description                                        |
| ------ | ------ | -------------------------------------------------- |
| hash   | string | hash to be fetched                                 |
| mode   | string | mode could be either public or restricted          |
| secret | string | secret of the data in case of restricted mode only |

## createTransaction(address, seed, message, tag) ⇒ Promise

Create a transaction

**Returns**: Promise - callback with <response>Object, <error>Object if any

| Param   | Type   | Description                                      |
| ------- | ------ | ------------------------------------------------ |
| address | string | address of the user                              |
| seed    | string | seed belong to the address to create transaction |
| message | string | value to be put in transation                    |
| tag     | string | (optional) tag                                   |

## fetchTransaction(address) ⇒ Promise

fetch transactions belongs to specific address

**Returns**: Promise - callback with <response>Object, <error>Object if any

| Param   | Type   | Description         |
| ------- | ------ | ------------------- |
| address | string | address of the user |

<a name="statusTransaction"></a>

## statusTransaction(transactions) ⇒ Promise

status of the transactions

**Returns**: Promise - callback with <response>Object, <error>Object if any

| Param        | Type  | Description      |
| ------------ | ----- | ---------------- |
| transactions | Array | transaction Hash |

<a name="confirmTransaction"></a>

## confirmTransaction(transactions) ⇒ Promise

confirm of the transaction mannually (if any conflict)

**Returns**: Promise - callback with <response>Object, <error>Object if any

| Param        | Type  | Description      |
| ------------ | ----- | ---------------- |
| transactions | Array | transaction Hash |

## generateSeed() ⇒ string

Create a new seed

**Returns**: string - generated seed  
<a name="createNewAddress"></a>

## createNewAddress(seed, [options]) ⇒ Promise

Create a new address

**Returns**: Promise - callback with <response>Object, <error>Object if any

| Param     | Type   | Default                 | Description                                                                         |
| --------- | ------ | ----------------------- | ----------------------------------------------------------------------------------- |
| seed      | string |                         | seed to be use to create a new account                                              |
| [options] | Object | {index: 0, security: 2} | (optional) options, same address will be derived if seed, index and secuity is same |

<a name="getBalance"></a>

## getBalance(address) ⇒ Promise

get balance of the account

**Returns**: Promise - callback with <response>Object, <error>Object if any

| Param   | Type   | Description |
| ------- | ------ | ----------- |
| address | string | address     |

## sortTransactionMessage(transaction) ⇒ Array

sort transaction messages

**Returns**: Array - sorted transactions

| Param       | Type  | Description  |
| ----------- | ----- | ------------ |
| transaction | Array | transactions |

## decodeMessage(encodedMessage) ⇒ string

decode encoded message

**Returns**: string - decoded message

| Param          | Type   | Description     |
| -------------- | ------ | --------------- |
| encodedMessage | string | encoded Message |

## encodeMessage(decodedMessage) ⇒ string

encode decoded message

**Returns**: string - encoded message

| Param          | Type   | Description     |
| -------------- | ------ | --------------- |
| decodedMessage | string | decoded Message |

# Usages

set of possible operations:

### Get the information of the node

```js
import { getNodeInfo } from "fiware-iota";

getNodeInfo()
    .then(res => {
        console.log(`res is${JSON.stringify(res)}`);
    })
    .catch(err => {
        console.log(`err${JSON.stringify(err)}`);
    });
```

### Create a new account

create of an account followed up with 2 steps: 1. create a new seed (you can also skip this step by using your existing
seed) 2. calling a create new account function

```js
import { generateSeed, createNewAddress } from "fiware-iota";
//generate a new seed
const seed = generateSeed();
//create a new account
createNewAddress(seed)
    .then(res => {
        console.log(`address is:${res}`);
    })
    .catch(err => {
        console.log(`err is:${err}`);
    });
```

### Create a new Transaction

create of an account followed up with 2 steps: 1. create a new seed (you can also skip this step by using your existing
seed) 2. calling a create new account function

```js
import { generateSeed, createNewAddress } from "fiware-iota";
//generate a new seed
const seed = generateSeed();
//create a new account
createNewAddress(seed)
    .then(res => {
        console.log(`address is:${res}`);
    })
    .catch(err => {
        console.log(`err is:${err}`);
    });
```

### Fetch any Transaction

```js
import { fetchTransaction } from "fiware-iota";
fetchTransaction("HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D")
    .then(res => {
        console.log(`response is :${JSON.stringify(res)}`);
    })
    .catch(err => {
        console.log(`err is :${JSON.stringify(err)}`);
    });
```

### Status of any Transaction

```js
import { statusTransaction } from "fiware-iota";

statusTransaction(["VDEVCBMSEUTOJNWSBCRQHJWAWXZCTFYUGFZXEPCFUVXQHEPQNL9I9BMMVFTUFTDEPRHRGPAIRAOVKQ999"])
    .then(res => {
        console.log(`response is :${JSON.stringify(res)}`);
    })
    .catch(err => {
        console.log(`err is :${JSON.stringify(err)}`);
    });
```

### Create a MaM Transaction (public)

```js
import { createMamTransaction } from "fiware-iota";

createMamTransaction("test")
    .then(re => {
        console.log(`re is${JSON.stringify(re)}`);
    })
    .catch(er => {
        console.log(`er is${JSON.stringify(er)}`);
    });
```

### Create a MaM Transaction (private)

```js
import { createMamTransaction } from "fiware-iota";

createMamTransaction("test", { mode: "restricted", secret: "1234" })
    .then(re => {
        console.log(`re is${JSON.stringify(re)}`);
    })
    .catch(er => {
        console.log(`er is${JSON.stringify(er)}`);
    });
```

### Fetch a MaM Transaction (public)

```js
import { fetchMamTransaction, decodeMessage } from "fiware-iota";

fetchMamTransaction(
    "9QBGGEEYGPNRZ9NQYBIVBNRJVPXWJUFHTKSRHOJZTNNKOBPBWGSXD9QRABWFDNP9VDOCRVHEIDPOWIUWC",
    "public",
    null,
    res => {
        const msg = decodeMessage(res);
        console.log(`message${msg}`);
    }
);
```

### Fetch a MaM Transaction (private)

```js
import { fetchMamTransaction, decodeMessage } from "fiware-iota";

fetchMamTransaction(
    "QQUTOYQDKWGEOSNDERIUTLNFJLKXKPGMZVDJJJNPMSXSIYHJDUUMZUEI9GGQSFQJD9GRVGCMNDDATPWDN",
    "restricted",
    "DONTSHARETHIS",
    res => {
        const msg = decodeMessage(res);
        console.log(`message${msg}`);
    }
);
```

# Pending (implementation)

1. getBalance
2. confirmTransaction
3. Test-Case

# License

[MIT](https://github.com/FIWARE-Blockchain/iota-lib/blob/master/LICENSE) © 2020 FIWARE Foundation e.V.
