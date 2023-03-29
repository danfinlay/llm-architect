# JavaScript

The JavaScript version of the MetaMask SDK enables all JavaScript-based apps to easily connect with a MetaMask wallet client. It supports:

- [React](/metamask-sdk-js/metamask-sdk-react.html)
- [Other web frameworks](/metamask-sdk-js/metamask-sdk-other-frameworks.html)
- [Pure javascript](/metamask-sdk-js/metamask-sdk-pure-javascript.html)
- [React Native](/metamask-sdk-js/metamask-sdk-react-native.html)
- [NodeJS](/metamask-sdk-js/metamask-sdk-nodejs.html)
- [Electron](/metamask-sdk-js/metamask-sdk-electron.html)

To install, import, instantiate and use the SDK, see the [getting started section](#getting-started). Deviations from the standard are highlighted on each of the supported frameworks.

## Getting started

### 1. Install a MetaMask Mobile version compatible with the SDK

In order to test the MetaMask SDK, developers need access to a MetaMask Mobile build that is compatible with the SDK. Please install MetaMask Mobile v5.8.1 or above.

### 2. Install the SDK

```bash
yarn add @metamask/sdk
or
npm i @metamask/sdk
```

### 3. Import the SDK

```javascript
import MetaMaskSDK from '@metamask/sdk';
```

### 4. Instantiate the SDK

For all Javascript-based apps, instantiate the SDK like this:

```javascript
const MMSDK = new MetaMaskSDK(options);

const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum
```

For a list of possible `options` check [here](/metamask-sdk-js/metamask-sdk-js-options.html)

### 5. Use the SDK

```javascript
ethereum.request({ method: 'eth_requestAccounts', params: [] });
```

You should always call `eth_requestAccounts` first!

For possible methods, check [the Ethereum Provider API](/ethereum-provider.html)
