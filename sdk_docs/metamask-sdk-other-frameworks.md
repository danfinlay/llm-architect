# Other web frameworks

If you are developing a web application that users can access via a desktop or mobile browser, you can import the MetaMask SDK and it will guide users to easily connect with MetaMask.

If the user is on a desktop browser and doesn't have the MetaMask extension installed, a popup will appear that will prompt users to either install MetaMask extension or to connect with MetaMask Mobile via a QR code.

If on a mobile browser, the SDK will automatically deeplink into MetaMask Mobile (or prompt users to install if they don't already have it) and once users accept the connection, they will be automatically redirected back to your web app. This will happen for all actions that need user approval.

If you are using React or similar frameworks you can use the SDK via import-style:

```javascript
import MetaMaskSDK from '@metamask/sdk';

const MMSDK = new MetaMaskSDK(options);

const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

ethereum.request({ method: 'eth_requestAccounts', params: [] });
```

For a list of possible `options` check [here](/metamask-sdk-js/metamask-sdk-js-options.html)

That's it!

:::tip
You should always call `eth_requestAccounts` first, that is what prompts the installation/connection popup to appear!

For other possible methods, check [the Ethereum Provider API](/ethereum-provider.html)
:::

### Recordings

- [Destkop web browser](https://recordit.co/g9u0X2S60Z)
- [Mobile web browser](https://recordit.co/2qy9lCVHWC)

### Examples

- [Hosted Test Dapp with SDK installed](https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/test-dapp/)
- [React Project](https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/downloads/create-react-app_v0.1.0.zip)

#### Install the example: `yarn`

#### Run the example: `yarn start`
