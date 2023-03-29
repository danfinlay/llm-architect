# NodeJS

You can import the MetaMask SDK into your nodeJS application to enable users to easily connect with their MetaMask Mobile wallet.

The SDK will render a QR code on the console which users can scan with their MetaMask Mobile app and now you can use all the [`ethereum` methods available](/ethereum-provider.html) right from your nodeJS app!

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

:::tip
You should always call `eth_requestAccounts` first--that is what makes the SDK render the QR code on the console!

For other possible methods, check [the Ethereum Provider API](/ethereum-provider.html)
:::

### Recordings

- [NodeJS app](https://recordit.co/2EiY8fQh48)

### Examples

- [NodeJS example](https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/downloads/nodejs_v0.0.1_beta5.zip)

#### Install the example: `yarn`

#### Run the example: `node .`
