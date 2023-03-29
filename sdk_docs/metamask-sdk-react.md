# React

If you are developing a web application that users can access via a desktop or mobile browser, you can import the MetaMask SDK and it will guide users to easily connect with MetaMask.

If the user is on a desktop browser and doesn't have the MetaMask extension installed, a popup will appear that will prompt users to either install MetaMask extension or to connect with MetaMask Mobile via a QR code.

If on a mobile browser, the SDK will automatically deeplink into MetaMask Mobile (or prompt users to install if they don't already have it) and once users accept the connection, they will be automatically redirected back to your web app. This will happen for all actions that need user approval.

<!--
There are two ways of using the MetaMask SDK with React:

- [Using the MetaMask Button and MetaMask Hooks for React (easiest)](#metamask-button-and-metamask-hooks-for-react)
- [Using the MetaMask SDK directly](#using-the-metamask-sdk-directly)

## MetaMask Button and MetaMask Hooks for React

The easiest way of using the MetaMask SDK on a React web app is to import our React library that was built using great web3 tools from our friends at [wagmi](https://wagmi.sh) and [ethers](https://docs.ethers.io/):

```javascript
yarn add @metamask/sdk-react
```

Then on the root of your React app import the MetaMask Provder and wrap the root of your application

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { MetaMaskProvider } from '@metamask/sdk-react'; // Import the MetaMask Provider here

import { chain } from '@metamask/sdk-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const networks = [chain.mainnet, chain.polygon, chain.optimism]; // Make your app support any network you want
const sdkOptions = {
  injectProvider: true,
};

// Make sure to wrap the root of your app with the MetaMaskProvider
root.render(
  <React.StrictMode>
    <MetaMaskProvider networks={[networks]} MetaMaskSDKOptions={sdkOptions}>
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);
```

For a list of possible `MetaMaskSDKOptions` check [here](/metamask-sdk-js/metamask-sdk-js-options.html)

Add the MetaMask Button to the UI:

```javascript
import { MetaMaskButton } from '@metamask/sdk-react';

...

<div>
  <MetaMaskButton/>
</div>
```

You can also use any React Hooks from [Wagmi](https://wagmi.sh/docs/hooks/useAccount):

```javascript
import { MetaMaskButton, useAccount, useSignMessage } from '@metamask/sdk-react';

...

const { isConnected } = useAccount();
const {
    data,
    isError,
    isLoading,
    isSuccess,
    signMessage,
  } = useSignMessage({
    message: 'gm wagmi frens',
  });

...

<div>
  <MetaMaskButton/>
  {isConnected && (
    <div>
      <button disabled={isLoading} onClick={() => signMessage()}>
        Click to sign
      </button>
      {isSuccess && <div>Signature: {data}</div>}
      {isError && <div>Error signing message</div>}
    </div>
  )}
</div>

```

## Using the MetaMask SDK directly

If you want to use the MetaMask SDK directly you can do it via import-style.
-->

### 1. Install a MetaMask Mobile version compatible with the SDK

In order to test the MetaMask SDK, developers need access to a MetaMask Mobile build that is compatible with the SDK. Please install MetaMask Mobile v5.8.1 or above.

### 2. Install the SDK

```bash
yarn add @metamask/sdk
or
npm i @metamask/sdk
```

### 3. Use the SDK

```javascript
import MetaMaskSDK from '@metamask/sdk';

const MMSDK = new MetaMaskSDK(options);

const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

ethereum.request({ method: 'eth_requestAccounts', params: [] });
```

For a list of possible `options` check [here](/metamask-sdk-js/metamask-sdk-js-options.html)

:::tip
You should always call `eth_requestAccounts` first, that is what prompts the installation/connection popup to appear!

For other possible methods, check [the Ethereum Provider API](/ethereum-provider.html)
:::

That's it!

### Recordings

- [Destkop web browser](https://recordit.co/g9u0X2S60Z)
- [Mobile web browser](https://recordit.co/2qy9lCVHWC)

### Examples

- [Hosted Test Dapp with SDK installed](https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/test-dapp-2/)
- [React Project](https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/downloads/create-react-app_v0.1.0.zip)

#### Install the example: `yarn`

#### Run the example: `yarn start`
