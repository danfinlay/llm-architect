# Welcome

MetaMask SDK provides an easy to use library for reliable, secure, seamless connection for your dapp to MetaMask extension and mobile.

Dapps commonly access the MetaMask Extension from a desktop browser, or MetaMask Mobile from the in-app browser. However, up till now, native mobile and desktop apps, games, and web apps on mobile browsers have struggled to connect to a MetaMask wallet.

Our goal is to enable delightful user experiences for your apps that are built for diverse communities of users and use-cases, and compatible with various platforms (mobile apps, desktop apps, web-apps).

The MetaMask SDK is a library that can be installed by developers in their projects and will automatically guide their users to easily connect with a MetaMask wallet client.

:::tip
The MetaMask SDK instance returns the [`ethereum` web3 provider](/ethereum-provider.html) that developers are already used to, so existing dapps should work out of the box with the SDK!
:::

## Example use cases

- Dapps running on a desktop browser: the MetaMask SDK checks if the MetaMask wallet browser extension is available and, if not, it prompts the user to install it or to connect via QR code with their MetaMask Mobile wallet.
- Native mobile applications: the MetaMask SDK automatically deeplinks to the user's MetaMask Mobile wallet to make the connection.

## Platforms supported

- [Javascript](/metamask-sdk-js)
  - [Web apps](/metamask-sdk-js/metamask-sdk-react.html)
    - [ReactJS](/metamask-sdk-js/metamask-sdk-react.html)
    - [Other web Framworks](/metamask-sdk-js/metamask-sdk-other-frameworks.html)
    - [Pure javascript](/metamask-sdk-js/metamask-sdk-pure-javascript.html)
  - [React Native](/metamask-sdk-js/metamask-sdk-react-native.html)
  - [NodeJS](/metamask-sdk-js/metamask-sdk-nodejs.html)
  - [Electron](/metamask-sdk-js/metamask-sdk-electron.html)
- [Mobile native apps](metamask-sdk-mobile.html#mobile)
  - [Android (coming soon)](metamask-sdk-mobile.html#android)
  - [iOS (coming soon)](metamask-sdk-mobile.html#ios)
  - [React Native](/metamask-sdk-js/metamask-sdk-react-native.html)
- [Gaming](metamask-sdk-gaming.html#gaming)
  - [Unity](metamask-sdk-unity.html)
  - [Unreal Engine (coming soon)](metamask-sdk-gaming.html#unreal-engine)
