# Known Issues & Future Work

## Known Issues

* Sometimes the connection gets paused when the MetaMask Mobile app is in background and is not resumed properly once the app is opened again. Sometimes the users needs to go back to the dapp so that the request gets sent again. We are working on this and believe if we implement a new protocol that holds state like Waku, this could be solved in a better way.

## Future Work

* Improve the SDK and add new capabilities based on the feedback from the developer community.
* Research implementing Waku or another similar decentralized communication solution.
* Pause connection on React Native apps once they go to background to accomodate OS restrictions so the apps don't get terminated.
* Create `metamask-react-sdk` and `metamask-react-native-sdk` packages that will make the installation of the SDK on React and React Native apps much easier. This will include hooks and other helpers to make it even easier to use.
